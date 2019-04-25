import EarthquakeData from './earthquake_data';
import Map from './map';


document.addEventListener('DOMContentLoaded', () => {
  const maps = new Map();
  maps.initMap();

  const year = document.getElementById('year')
  const month = document.getElementById('month')
  month.addEventListener('change', () => {
    if (month.value === "allyear"){
      $('#mag-message').removeClass('off').addClass('on')
    } else {
      $('#mag-message').removeClass('on').addClass('off')
    }
  })
  
  const timely = document.getElementById('time');
  timely.addEventListener('submit', (event) => {
    event.preventDefault();

    const emap = new EarthquakeData(year.value, month.value);
    
    if (month.value === "allyear"){
      maps.refreshMap(emap.getStartYear(), emap.getEndYear(), 4.5);
    } else {
      maps.refreshMap(emap.getStartDate(), emap.getEndDate(), 0);
    }
  })
  
  const center = document.getElementById('center');
  center.addEventListener('click', () => maps.center())

  const legend = document.getElementById('legend');
  legend.addEventListener('click', () => {
    $('#mag').toggleClass("off")
  })
});