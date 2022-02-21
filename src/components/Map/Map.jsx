import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Geocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Popup from './../Popup/Popup';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtYW5rdW1hcmkiLCJhIjoiY2t6cWxxMHR3MDRobDJ1bW9maTU1ZXJjaiJ9.6lCE6PzPulyoc7-nH7d4dg';

const Map = ({setCoordinates, setBounds, coordinates, places }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popupRef = useRef(null);
  const [zoom, setZoom] = useState(7);

//   const places = [
//     { name: 'Cool Place'},
//     { name: 'Best Beer'},
//     { name: 'Best Steak'},
//     { name: 'Cool Place'},
//     { name: 'Best Beer'},
//     { name: 'Best Steak'},
//     { name: 'Cool Place'},
//     { name: 'Best Beer'},
//     { name: 'Best Steak'}
// ];




  useEffect(() => {
    console.log('Hi from map');
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coordinates.lng, coordinates.lat],
      zoom: zoom
    });
  
    //const marker1 = new mapboxgl.Marker({ color: 'black', rotation: 45 }).setLngLat([77.59998333333333, 12.960435333333333]).addTo(map.current);
    const div = window.document.createElement('div');
    div.className = "css-class-name";
    div.innerHTML = 'Hello, world!';
    const popup = new mapboxgl.Popup({offset: 25}).setLngLat([77.59998333333333, 12.960435333333333]).setDOMContent(div).addTo(map.current);
    ReactDOM.render(<Popup/>, div);
    console.log('Map.current : ', map.current);
    
    map.current.on('move', () => {
      let obj = {lat: map.current.getCenter().lat.toFixed(4), lng: map.current.getCenter().lng.toFixed(4)};
      setCoordinates(obj);  
      let southWestCoord = (map.current.getBounds().toArray())[0];
      let northEastCoord = ((map.current.getBounds().toArray())[1]);
      setBounds({sw: {lng: southWestCoord[0], lat: southWestCoord[1]}, ne: {lng: northEastCoord[0], lat: northEastCoord[1]}});
      //map.current.getBounds().toArray() returns [sw, ne] 0: (2) [75.63131902744402, 10.869685537866928] 1: (2) [79.87999439171483, 14.882192113222388]
      //map.current.getBounds().toArray().flat() returns  (4) [73.84033275236754, 10.72247173356891, 79.85741825412714, 16.387990332101793]
      //geocoder.setBbox([minX, minY, maxX, maxY]);
      console.log('Bounds are: ', map.current.getBounds().toArray()); 
      
    });

  }, [coordinates,setCoordinates]);

  // useEffect(() => {
  //   // if (map.current) return; 
  //   map.current.addControl(
  //     new mapboxgl.GeolocateControl({
  //         positionOption: {
  //             enableHighAccuracy: true
  //         },
  //         trackUserLocation: true,
  //         showUserHeading: true
  //     })
  // );
  // }, []);
  

  return (
    <div>
      <div className="sidebar">
        Longitude: {coordinates.lng} | Latitude: {coordinates.lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Map;