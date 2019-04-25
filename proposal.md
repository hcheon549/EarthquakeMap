# Earthquake Map

Earthquake Map is an easy and interactive way to explore information on the earthquakes that happened in the world at a given period of time. The earthquake will map the data starting from **20xx** to **20xx** data provided by the USGS (United States Geological Survey).

Live Demo (Coming Soon)

## Functionality & MVP  

With this Earthquake Map, users will be able to:

- [ ] View the date, location, magnitude of earthquakes that happened given a period of time
- [ ] Hover over the marker on the map to see detail information about the earthquake
- [ ] User's ability to filter parameters to map a particular set of earthquakes
- [ ] Run a runtime of earthquakes at a given year

In addition, this project will include:

- [ ] Links to my Website, LinkedIn, Github
- [ ] A production README

## Wireframes

This app will consist of a single screen with optional parameters on the left and the main map on the right. The map will be a dotted marker at the location of earthquakes, and the size that represents the magnitude. Option Selection section will consist of button and input fields that users can input to filter the earthquake information being populated on the map.


## Implementation Timeline

**Day 1**: 
- [ ] Set up the layout of the page in HTML
- [ ] Put the map and the option input fields on (at least non-functional)
- [ ] Familiarize myself with the USGS API calls.
- [ ] Make a decision on the range of the years

**Day 2**: 
- [ ] Complete populating all the earthquake in information on the map
- [ ] Start working on the filtering options
- [ ] Finish a functionality of filtering by years
- [ ] (Bonus) Finish a functionality of filtering by a range of magnitude

**Day 3**: 
- [ ] Pick up where I was left off on Day 2 on options
- [ ] Finish options input
- [ ] Finish a runtime option of a given year

**Day 4**: 
- [ ] Finish the information tag on hovering a dot on the map
- [ ] (Bonus) Have information tags appear during the annual runtime if the magnitude is greater than 7

## Bonus features

There are many additional features that this website can provide. The main bonus feature that I would like to work on is to use the New York Times API to grab related new articles about the earthquake when a user clicks on a dot on the map. This feature would populate related New York Times articles with a headline, an image, and a preview of each article on the bottom of the page.

## Data and API

Following data APIs will mainly be used:

- Earthquake Data
  - USGS (United States Geological Survey)
- (Bonus Feature) Related Articles
  - New York Times Archive API
