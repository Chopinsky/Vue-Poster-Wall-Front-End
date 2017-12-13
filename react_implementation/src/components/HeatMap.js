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

class HeatMap extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      'map': null,
    }

    if (typeof this.props.LoadLocHistory === 'function') {
      setTimeout(() => {
        this.props.LoadLocHistory();      
      }, 0);
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
      this.initMap(nextProps.heatmap.googlemaps);
    }
  }

  initMap(googlemaps) {
    var uluru = {lat: -25.363, lng: 131.044};
    const map = new googlemaps.Map(
      this.mapdiv, 
      {center: uluru, zoom: 8}
    );

    const marker = new googlemaps.Marker({
      position: uluru,
      map: map
    });
  }

  render() {
    let { heatmap } = this.props;
    return (
      <div id='map-container'>
        <div 
          id='map' 
          style={styles.mapContainer} 
          ref={ref => this.mapdiv = ref} 
        />
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