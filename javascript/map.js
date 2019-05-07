export default class Map {
  constructor() {
    this.accessToken = 'pk.eyJ1IjoiaGNoZW9uNTQ5IiwiYSI6ImNqdWUyNnVrbDBkczAzeW10NTBtOGE2bzIifQ.nInYW-ZDqOxWy0FKy-ZzlA';
    this.zoomLevel = 0.81
    this.initMap = this.initMap.bind(this);
    this.refreshMap = this.refreshMap.bind(this);

    this.addSource = this.addSource.bind(this);
    this.removeSource = this.removeSource.bind(this);

    this.addPointLayer = this.addPointLayer.bind(this);
    this.addHeatLayer = this.addHeatLayer.bind(this);
    this.removeLayer = this.removeLayer.bind(this);

    this.center = this.center.bind(this);

    this.popup = this.popup.bind(this);
  }

  initMap() {
    mapboxgl.accessToken = this.accessToken;
    const initMagnitude = 7
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/hcheon549/cjue2b9xw1bi81fnrcqcdkrar',
      center: [160, 30],
      zoom: `${this.zoomLevel}`,
      dragRotate: false
    });

    this.map.on('load', () => {
      this.addSource('2000-01-01', '2018-12-31', initMagnitude)
      this.addPointLayer();
    })

    this.map.on('mousemove', event => {
      const lat = Math.round(event.lngLat.lat * 1000)/1000;
      const lng = Math.round(event.lngLat.lng * 1000)/1000;
      let lngContent
      
      if (lng > 180){
        lngContent = `${Math.abs(Math.round((event.lngLat.lng-180)*1000)/1000)}&#176;` + ' W'
      } else if (lng > 0) {
        lngContent = `${Math.abs(lng)}&#176;` + ' E'
      } else {
        lngContent = `${Math.abs(lng)}&#176;` + ' W'
      }
      
      document.getElementById('lat').innerHTML = 
        lat > 0 ? `${Math.abs(lat)}&#176;` + ' N' : `${Math.abs(lat)}&#176;` + ' S'
      document.getElementById('lng').innerHTML = lngContent
    });
    this.displayData('2000-01-01', '2018-12-31', initMagnitude);
    this.popup();
  }

  displayData(start, end, mag){
    const magnitude = Boolean(typeof mag === "undefined") ? 4.5 : mag;
    
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/count?format=geojson&starttime=${start}&endtime=${end}&minmagnitude=${magnitude}`;
    fetch(url).then((response) => {
      response.json().then((data) => {
        document.getElementById('count').innerHTML = data.count;
      });
    });

    document.getElementById('start').innerHTML = start;
    document.getElementById('end').innerHTML = end;
    document.getElementById('minmag').innerHTML = magnitude;
  }

  refreshMap(start, end, mag) {    
    if (Boolean(this.detailInfo)) {this.detailInfo.remove();}
    this.removeLayer();
    this.removeSource();
    this.addSource(start, end, mag);
    this.addPointLayer();
    this.displayData(start, end, mag);
  }

  addSource(start, end, mag) {
    const magnitude = Boolean(typeof mag === "undefined") ? 4.5 : mag;
    this.map.addSource(`${this.earthquake}`, {
      "type": "geojson",
      "data": `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${start}&endtime=${end}&minmagnitude=${magnitude}`
    })
  }

  removeSource() {
    this.map.removeSource(`${this.earthquake}`)
  }

  addHeatLayer() {
    this.map.addLayer({
      "id": "earthquakes-mag",
      "type": "heatmap",
      "source": `${this.earthquake}`,
      "maxzoom": 9,
      "paint": {
        // Increase the heatmap weight based on frequency and property magnitude
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", "mag"],
          0, 0,
          6, 1
        ],
        
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        "heatmap-intensity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0, 1,
          9, 3
        ],
    
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(33,102,172,0)",
          0.2, "rgb(103,169,207)",
          0.4, "rgb(209,229,240)",
          0.6, "rgb(253,219,199)",
          0.8, "rgb(239,138,98)",
          1, "rgb(178,24,43)"
        ],
    
        // Adjust the heatmap radius by zoom level
        "heatmap-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0, 2,
          9, 20
        ],
    
        // Transition from heatmap to circle layer by zoom level
        "heatmap-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7, 1,
          9, 0
        ],
      }
    }, 'waterway-label');
  }

  addPointLayer() {
    this.map.addLayer({
      "id": "earthquakes-point",
      "type": "circle",
      "source": `${this.earthquake}`,
      "minzoom": 0,
      "paint": {
        // Size circle radius by earthquake magnitude and zoom level
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7, [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            1, 1,
            6, 4
          ],
          16, [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            1, 5,
            6, 50
          ]
        ],
    
        // Color circle by earthquake magnitude
        "circle-color": [
          "step",
          ["get", "mag"],
          "white", 2,
          "#FFD3B9", 4,
          "#ce722c", 6,
          "#c20000", 8, 
          "#290000"
        ],
        "circle-stroke-color": "white",
        "circle-stroke-width": 1,
      }
    }, 'waterway-label');  
  }

  removeLayer() {
    this.map.removeLayer("earthquakes-point");
  }

  center() {
    this.map.flyTo({
      center: [160, 30],
      zoom: `${this.zoomLevel}`,
      speed: 4.0,
      easing(t) {
        return t;
      }
    })
  }

  popup() {
    // Change the cursor to a pointer when the mouse is over the places layer.
    this.map.on('mouseenter', 'earthquakes-point', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    
    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'earthquakes-point', () => {
      this.map.getCanvas().style.cursor = '';
    });

    this.map.on('click', 'earthquakes-point', (e) => {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var content = this.popupContent(e.features[0].properties)

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      
      this.detailInfo = new mapboxgl.Popup()
      this.detailInfo
        .setLngLat(coordinates)
        .setHTML(content)
        .addTo(this.map);
    });
    
  }

  popupContent(properties) {
    const content = (
      '<div class="popup-content-container">' +
        '<div class="info-container">' +
          `<div class="data-type">Date:</div><div class="info">${this.dateFormatter(new Date(properties.time))}</div>` +
        '</div>' +
        '<div class="info-container">' +
          `<div class="data-type">Location:</div><div class="info">${properties.place}</div>` +
        '</div>' +
        '<div class="info-container">' +
          `<div class="data-type">Magnitude:</div><div class="info">${properties.mag}</div>` +
        '</div>' +
        `<div class="link-container">` +
          `<a href="${properties.url}" target="_blank">View Detail</a>` +
        '</div>' +
      '</div>'
    )

    return content
  }

  dateFormatter(date){
    const utcYear = date.getUTCFullYear();
    const utcMonth = this.timeFormatter(date.getUTCMonth() + 1);
    const utcDate = this.timeFormatter(date.getUTCDate());
    const utcHour = this.timeFormatter(date.getUTCHours());
    const utcMinute = this.timeFormatter(date.getUTCMinutes());
    const utcSecond = this.timeFormatter(date.getUTCSeconds());

    const formattedDate = `${utcYear}-${utcMonth}-${utcDate} ${utcHour}:${utcMinute}:${utcSecond} (UTC)`

    return formattedDate
  }

  timeFormatter(time){
    return time < 10 ? `0${time}` : `${time}`
  }
  
}