import { combineReducers } from 'redux';

const initState = {
  isFetching: false,
  data: null,
  hasError: false,
  errorMessage: null
}

const tweetReduer = (state = {}, action) => {
  switch (action.type) {
    case "CHAR_BELOW_TWENTY":
      return {
        ...state,
        charCntClass: "lessThanTwenty"
      };
    case "CHAR_BELOW_TEN":
      return {
        ...state,
        charCntClass: "lessThanTen"
      }
    default:
      return state;
  }
};

const cryptoReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_COIN_DATA":
      return {
        ...state,
        ...initState,
        isFetching: true
      };

    case "FETCH_COIN_DATA_SUCCESS":
      return {
        ...state,
        ...initState,
        data: action.payload
      };

    case "FETCH_COIN_DATA_FAILURE":
      return {
        ...state,
        ...initState,
        hasError: true,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};

export default combineReducers({
  tweet: tweetReduer,
  crypto: cryptoReducer
});
