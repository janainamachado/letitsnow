const db = require("../model/helper");
var express = require("express");
const fetch = require('node-fetch');
import fs from 'fs/promises';
import mysql from 'mysql';

const weatherAPI = process.env.WEATHER_API_KEY

async function getCitiesByCountry(countryFilter){
  let data = await fs.readFile('./public/citylist.json');
  let cities = JSON.parse(data);
  return cities.filter(city => city.country === countryFilter);
}

async function filterCitiesBySnow(cities){
  let snowedCities = []
  let weather;
  for (const city of cities)
    try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${weatherAPI}`)
    if (!response.ok) throw new Error(`Failed to fetch weather data for ${city.name}`);
    weather = await response.json();
    if(weather.snow){
      snowedCities.push(weather)
    }
  }
    catch (error) {
      console.error(`Error fetching weather data: ${error.message}`);
}
  return snowedCities 
}

function saveCitiesList(cities){
    for (const city of cities){
    let insert = `INSERT INTO cities_weather (city_name, latitude, longitude, weather_type, current_temp_celsius, max_temp_celsius, min_temp_celsius, snow_mm)
    VALUES ("${city.name}", ${city.coord.lat}, ${city.coord.lon}, "${city.weather[0].main}", ${city.main.temp}, ${city.main.temp_min}, ${city.main.temp_max}, ${city.snow['1h']})`;
    let result = db(insert);
  }
}

function run(){
  getCitiesByCountry("LT", async function(cities){
  cities = await filterCitiesBySnow(cities)
  saveCitiesList(cities)
  }) 
} 

run();