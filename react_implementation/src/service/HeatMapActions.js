import Constant from './Constants.js';
import jquery from 'jquery';

export const LoadLocHistory = (googlemaps) => {
  return (dispatch) => {  
    const rawLocHist = require('../assets/history.json');
    
    let locHist = rawLocHist.locations.map((val) => {
      return new googlemaps.LatLng(val.latitudeE7 * (10 ** -7), val.longtitudeE7 * (10 ** -7));
    });

    dispatch({ type: 'LOAD_LOC_HIST', payload: locHist });
  }
}

export const InitMap = () => {
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