import React, { useState, useEffect } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiamFuYWluYW1hY2hhZG8iLCJhIjoiY2t5d3RveHpiMGJ2ajJ3cXc5ZnUwaHYzOSJ9.NmQ2aaJ6nnZELj9FzP7Ymw';

function App(){ 
  const [map, setMap] = useState([]);
  
  useEffect(() => {
    setMap(new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-1.080278, 53.958332],
    zoom: 13,
    scrollZoom: false
}));
  }, []);

  return (
  <div>
    <div className='sidebar'>
      <div className='heading'>
        <h1>Cities</h1>
      </div>
      <div id='listings' className='listings'></div>
    </div>
      <div id='map' className='map'></div>
  </div>
  )
}

export default App;

