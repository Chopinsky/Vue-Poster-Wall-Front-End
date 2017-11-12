import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './service/registerServiceWorker';

import './index.css';
import App from './components/App';

import { default as appRecuder } from './reducers/appReducer';

let store = createStore(appRecuder);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
