import React, {useState, useEffect} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [places, setPlaces] = useState([]);
  // const [coordinates, setCoordinates] = useState({lat: '12.960435333333333', lng: '77.59998333333333'});
  const [coordinates, setCoordinates] = useState({lat: '12.960435333333333', lng: '77.59998333333333'});
  const [bounds, setBounds] = useState({sw: '', ne: ''});

  useEffect(() => {
    console.log('Hi from App:');
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      console.log('Current Location: ', latitude, longitude);
      setCoordinates({lat: latitude, lng: longitude});
    });
  }, []);

  useEffect(() => {
    console.log('Coordinates are Maggi: ', coordinates, bounds);
    getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {
        console.log(data);
        setPlaces(data);
      });
    
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline/>
      <Header/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places}/>
        </Grid>
        <Grid item xs={12} md={8} style={{ width: '100%' }}>
          <Map 
            setCoordinates={setCoordinates} 
            setBounds={setBounds} 
            coordinates={coordinates}
            places={places}
          />
       </Grid>
      </Grid>
    </>
  ) 
}

export default App;
// import Calculator from './Calculator';

// const App = () => {
//   return (
//     <>
//       <Calculator/>
//     </>
//   );
// }

// export default App;