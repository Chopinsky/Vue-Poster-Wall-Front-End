import Constant from './Constants.js';
import jquery from 'jquery';

export default () => {
  return (dispatch) => {
    dispatch({ type: "FETCH_COIN_DATA" });

    return jquery.get(`${Constant.apiBaseURL}/v1/ticker/?limit=10`)
                 .then((res) => {
                  dispatch({ type: "FETCH_COIN_DATA_SUCCESS", payload: res });
                 })
                 .catch((err) => {
                  dispatch({ type: "FETCH_COIN_DATA_FAILURE", payload: err });
                 });
  }
}