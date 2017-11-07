import React, { Component } from 'react';
import Header from './Header';
import Composer from './Composer';

const appStyle = {
  textAlign: "center"
}

export default class App extends Component {
  render() {
    return (
      <div style={appStyle}>
        <Header />
        <Composer />
      </div>
    );
  }
}
