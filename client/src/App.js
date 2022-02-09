import React, { useState, useEffect } from 'react';
import './App.css';
const mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = 'pk.eyJ1IjoiamFuYWluYW1hY2hhZG8iLCJhIjoiY2t5d3RveHpiMGJ2ajJ3cXc5ZnUwaHYzOSJ9.NmQ2aaJ6nnZELj9FzP7Ymw';

function App(){ 
  const [mapBox, setMapBox] = useState();
  const [cityMarker, setCityMarker] = useState([]);
  
  useEffect(() => {
    setMapBox(new mapboxgl.Map({
      container: 'mapBox',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [24.00000000, 55.16670000],
      zoom: 13,
      scrollZoom: false
    })); 
    getCityMarker();
    buildCityList(cityMarker);
  }, []);

  useEffect(() => {
    if(mapBox) {
    }
  }, [mapBox])


  const getCityMarker = () => {
    fetch(`/cities`)
    .then(response => response.json())
    .then(cityMarker => {
      setCityMarker(cityMarker)
      
    })
    .catch(error => 
      console.log(error))
  }

  cityMarker.map((city) =>
  new mapboxgl.Marker()
    .setLngLat([city.longitude, city.latitude])
    .setPopup(
      new mapboxgl.Popup({ offset: 25 })
  .setHTML(
    `<h3>${city.city_name}</h3>`
  )
    )
    .addTo(mapBox)
  )

  const buildCityList = (cityMarker) => {
    for (const city of cityMarker) {
    const listings = document.getElementById('listings');
    const listing = listings.appendChild(document.createElement('div'));
    
    listing.id = `listing-${city.id}`;
    listing.className = 'item';

    const link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.id = `link-${city.id}`;
    link.innerHTML = `${city.city_name}`;

    const details = listing.appendChild(document.createElement('div'));
    details.innerHTML = `${city.weather_type}`
    }
  }

  return (
    <div className='container'>
      <div className='sidebar'>
        <div className='heading'>
          <h1>Cities</h1>
        </div>
        <div id='listings' className='listings'></div>
      </div>
      <div className='mapContainer'>
        <div id='mapBox' className='map'></div>
      </div>
    </div>
  
  )
}

export default App;

