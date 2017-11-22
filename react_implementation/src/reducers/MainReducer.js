import { combineReducers } from 'redux';
import tweetReducer from './TweetReducer';
import cryptoReducer from './CryptoReducer';

export default combineReducers({
  tweet: tweetReducer,
  crypto: cryptoReducer
});
