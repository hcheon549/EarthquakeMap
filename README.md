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

The dots populated on the map represent an earthquake that has happened during the period user selected on the location. The color of the dot represent the range of magnitude in which the specific earthquake falls under. The magnitude has 5 different ranges from 0 ~ 2 colored in white, 2 ~ 4 colored in light orange, 4 ~ 6 colored in orange, 6 ~ 8 colored in red, 8 or higher colored in dark red.

[MagnitudeLegend]: https://github.com/hcheon549/EarthquakeMap/blob/master/img/MagnitudeLegend.png "MagnitudeLegend"
![MagnitudeLegend][MagnitudeLegend]

Users can get more information about the earthquake by clicking the dot. The pop-up window will provide breif information about the earthquake, namely the date, location and magnitude. Clicking the View Detail link will direct users to the USGS page of the specific earthquake.

[Popup]: https://github.com/hcheon549/EarthquakeMap/blob/master/img/Popup.png "Popup"
![Popup][Popup]