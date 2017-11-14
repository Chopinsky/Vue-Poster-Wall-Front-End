import { createStore, applyMiddleware, compose } from 'redux';
import devTools from 'remote-redux-devtools';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import appReducer from './reducers/appReducer';

const middleware = applyMiddleware(thunk, promise, logger);
const Store = createStore(
  appReducer,
  compose(
    middleware,
    devTools({
      name: "win10",
      hostname: 'localhost',
      port: 8080
    })
  )
);

export default Store;