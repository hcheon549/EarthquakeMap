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

![LandingPage] (./img/EarthquakeMapLanding.png)

Users can populate earthquake data by selecting the year and the month they wish to view. Users can also select the Year-Around option for the month option where it populates the earthquake data from January 1st to December 31st of the selected year. However, when the year-around option is selected, the data will fetch only the earthquakes with the magnitude of 4.5 or higher. Limiting the data serves two purposes:
1. Staying within the USGS API call limit of 20,000 per request
2. Optimizing user's experience by reducing the load time