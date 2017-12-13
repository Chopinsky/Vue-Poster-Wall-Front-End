import React, { Component } from 'react';
import $ from 'jquery';

// const styles = {}
const MAP_KEY = 'AIzaSyDLpyf4_S30etuLNrodI8umfDNkEuW9D5g';

export default class HeatMap extends Component {
  constructor(props) {
    super(props);

    this.geo = require('../assets/history.json');

    if (!window.hasOwnProperty('google')) {
      $.getScript(
        `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&libraries=visualization`, 
        (data, textStatus, jqxhr) => {
          if (jqxhr.status === 200 && window.hasOwnProperty('google')) {
            this.googlemap = window.google.maps;
            this.initMap();
          }
        }
      );
    }

    this.initMap = this.initMap.bind(this);
  }

  initMap() {
    // console.log(this.googlemap);
    //this.map = new google.maps.Map(document.getElementById('map'), {center: 'SYDNEY', zoom: 12});
  }

  render() {
    return (
      <div id='map'>
        {this.geo.locations[0].toString()}
      </div>
    );
  }
}