import { combineReducers } from 'redux';

import tweetReducer from './TweetReducer';
import cryptoReducer from './CryptoReducer';
import heatmapReducer from './HeatMapReducer';

export default combineReducers({
  tweet: tweetReducer,
  crypto: cryptoReducer,
  heatmap: heatmapReducer,
});
