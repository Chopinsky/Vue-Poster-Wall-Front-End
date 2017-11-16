import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import appReducer from './reducers/AppReducer';

const middleware = applyMiddleware(thunk, promise, logger);
const Store = createStore(
  appReducer,
  compose(middleware)
);

export default Store;