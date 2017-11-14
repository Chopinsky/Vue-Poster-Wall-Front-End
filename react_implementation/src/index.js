import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './service/registerServiceWorker';

import './index.css';
import App from './components/App';
import Store from './store';

//import { default as appRecuder } from './reducers/appReducer';
//let store = createStore(appRecuder);

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
