import Constant from './Constants.js';
import jquery from 'jquery';

export const LoadLocHistory = (googlemaps) => {
  return (dispatch) => {  
    const rawLocHist = require('../assets/history.json');
    dispatch({ type: 'LOAD_LOC_HIST', payload: rawLocHist.locations });
  }
}

export const LoadMap = () => {
  return (dispatch) => {
    if (!window.hasOwnProperty('google')) {
      jquery
        .getScript(
          `https://maps.googleapis.com/maps/api/js?key=${Constant.MAP_KEY}&libraries=visualization`, 
          (data, textStatus, jqxhr) => {
            if (jqxhr.status === 200 && window.hasOwnProperty('google')) {
              dispatch({ type: 'INIT_MAP', payload: window.google.maps });
            }
          }
        );
    } else {
      // window.google have already been loaded
      dispatch({ type: 'INIT_MAP', payload: window.google.maps });
    }

  }
}

export const LoadEarthquake = (version) => {
  return (dispatch) => {
    const geoInfo = version ? version : '4.5_month';
    jquery
      .get(`${Constant.USGS_URL}/${geoInfo}.geojson`, (data, textStatus) => {
        if (textStatus === 'success') {
          dispatch({ type: 'EARTHQUAKE', payload: data.features, meta: data.metadata });
        }
      });
  }
}