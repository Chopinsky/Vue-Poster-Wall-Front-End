import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LoadLocHistory, InitMap } from '../service/HeatMapActions';

const styles = {
  'mapContainer': {
    'height': '700px', 
    'width': '850px', 
    'margin':'auto'
  }
}

const deferStateUpdates = (deferFn) => {
  if (typeof deferFn === 'function') {
    setTimeout(deferFn, 0);
  }
}

class HeatMap extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      'mapinit': false,
    }

    if (typeof this.props.InitMap === 'function') {
      setTimeout(() => {
        this.props.InitMap();      
      }, 0);
    }

    this.initMap = this.initMap.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.heatmap.googlemaps && nextProps.heatmap.googlemaps) {
      //this.initMap(nextProps.heatmap.googlemaps);
    }
  }

  initMap() {
    if (this.state.mapinit) return;

    let { googlemaps } = this.props.heatmap;
    if (!googlemaps) return;

    //const uluru = {lat: -25.363, lng: 131.044};
    const sf = { lat: 37.775, lng: -122.434 };
    const map = new googlemaps.Map(this.mapdiv, {
      center: sf, 
      zoom: 4,
      mapTypeId: 'roadmap'
    });

    const marker = new googlemaps.Marker({
      position: sf,
      map: map
    });

    deferStateUpdates(() => {      
      this.setState({
        'mapinit': true
      }, () => this.loadLocHist());
    });
  }

  loadLocHist() {       
    if (typeof this.props.LoadLocHistory === 'function' 
        && !this.props.heatmap.locHist) {
      let { googlemaps } = this.props.heatmap;
      this.props.LoadLocHistory(googlemaps);
    }
  }

  render() {
    let { heatmap } = this.props;
    return (
      <div id='map-container'>
        { heatmap.googlemaps ? this.initMap() : "Loading..." }
        <div
          id='map' 
          style={styles.mapContainer} 
          ref={ref => this.mapdiv = ref}
        />
        { heatmap.locHist ? heatmap.locHist.length : 0}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // this will become this.props.heatmap
  return {
    heatmap: state.heatmap
  }
}

export default connect(mapStateToProps, { LoadLocHistory, InitMap })(HeatMap);