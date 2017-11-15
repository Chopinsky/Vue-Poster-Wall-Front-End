import { combineReducers } from 'redux';

const tweetReduer = (state = {}, action) => {
  switch (action.type) {
    case 'CHAR_BELOW_TWENTY':
      return {
        ...state,
        charCntClass: "lessThanTwenty"
      };
    case 'CHAR_BELOW_TEN':
      return {
        ...state,
        charCntClass: "lessThanTen"
      }
    default:
      return state;
  }
};

const cryptoReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_TWEET':
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  tweet: tweetReduer,
  crypto: cryptoReducer
});
