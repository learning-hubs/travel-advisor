import axios from 'axios';

//const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';


export const getPlacesData = async (sw, ne) => {
    try {
        const {data: {data}} = await axios.get(URL, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng
            },
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': 'e3cce031e4mshb031b9349f639ecp14b85bjsn41c629e1d3d4'
            }
          });

        return data;
    } catch (error) {
        console.log(error)
    }
}