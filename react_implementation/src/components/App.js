import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header';
import Composer from './Composer';
import Tracker from './Tracker';
import HeatMap from './HeatMap';
import TrieSearch from './TrieSearch';

const appStyle = {
  textAlign: "center"
}

export default class App extends Component {
  render() {
    return (
      <div style={appStyle}>
        <Header activeLink={"home"} />
        <Switch>
          <Route exact path='/' component={Composer} />
          <Route path='/traker' component={Tracker} />
          <Route path='/map' component={HeatMap} />
          <Route path='/trie' component={TrieSearch} />
        </Switch>
      </div>
    );
  }
}
