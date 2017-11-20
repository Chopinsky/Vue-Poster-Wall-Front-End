import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import mainReduer from './reducers/MainReducer';

const middleware = applyMiddleware(thunk, promise, logger);
const Store = createStore(
  mainReduer,
  compose(middleware)
);

export default Store;