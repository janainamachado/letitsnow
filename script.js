import { db } from "./model/helper.js";
import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import mysql from 'mysql';

const WEATHER_API_KEY ="560c07ba9ef1687e2676d8acba1e4696"

function getCitiesByCountry(countryFilter, callback){
    let filtered = []
    fs.readFile('./public/citylist.json', (err, data) => {
      if (err) throw err;
      let cities = JSON.parse(data);

      for(let i = 0; i < cities.length; i++){
        if(cities[i].country === countryFilter){
          filtered.push(cities[i])
        }
      } 
     callback(filtered)
    })
}

async function filterCitiesBySnow(cities){
  let snowedCities = []
  let weather;
  for (const city of cities){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${WEATHER_API_KEY}`)
    weather = await response.json();
    if(weather.snow){
      snowedCities.push(weather)
    }
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