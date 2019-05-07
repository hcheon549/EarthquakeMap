# Earthquake Map

[Live Demo](https://www.earthquakemap.nyc)

Earthquake Map is an interactive way to explore information on the earthquakes that happened in the world from 2000 to 2018. The earthquake data is provided by the United States Geological Survey(USGS) using its API calls.

## Technologies

+ JavaScript
+ jQuery
+ Mapbox API
+ USGS API
  + GeoJSON

## Features

[LandingPage]: https://github.com/hcheon549/EarthquakeMap/blob/master/img/EarthquakeMapLanding.png "LandingPage"
![LandingPageImage][LandingPage]

Users can populate earthquake data by selecting the year and the month they wish to view. Users can also select the Year-Around option for the month option where it populates the earthquake data from January 1st to December 31st of the selected year. However, when the year-around option is selected, the data will fetch only the earthquakes with the magnitude of 4.5 or higher. Limiting the data serves two purposes:
1. Staying within the USGS API call limit of 20,000 per request
2. Optimizing user's experience by reducing the load time

The points populated on the map represent an earthquake that has happened during the period user selected on the location. The color of the point represent the range of magnitude in which the specific earthquake falls under. The magnitude has 5 different ranges from 0 ~ 2 colored in white, 2 ~ 4 colored in light orange, 4 ~ 6 colored in orange, 6 ~ 8 colored in red, 8 or higher colored in dark red.

[MagnitudeLegend]: https://github.com/hcheon549/EarthquakeMap/blob/master/img/MagnitudeLegend.png "MagnitudeLegend"
![MagnitudeLegend][MagnitudeLegend]

Users can get more information about the earthquake by clicking the point. The pop-up window will provide breif information about the earthquake, namely the date, location and magnitude. Clicking the View Detail link will direct users to the USGS page of the specific earthquake.

[Popup]: https://github.com/hcheon549/EarthquakeMap/blob/master/img/Popup.png "Popup"
![Popup][Popup]

## Implementation

Using the Mapbox API, I can add GeoJSON source to a map that will populate the points with the given data.

```javascript
  addSource(start, end, mag) {
    const magnitude = Boolean(typeof mag === "undefined") ? 4.5 : mag;
    this.map.addSource(`${this.earthquake}`, {
      "type": "geojson",
      "data": `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${start}&endtime=${end}&minmagnitude=${magnitude}`
    })
  }
```

Pop up boxes appear on click of an earthquake points at the location of the clicked point. In case when user dragged the map horizontally so that more tha one point exist that denote the identical earthquake, the clicked point is recognized by grabbing the longitude of the clicked point.

```javascript
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
```