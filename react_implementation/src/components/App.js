import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Header from './Header';
import Composer from './Composer';
import Tracker from './Tracker';

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
        </Switch>
      </div>
    );
  }
}
