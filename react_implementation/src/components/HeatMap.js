import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LoadLocHistory, LoadMap } from '../service/HeatMapActions';

const styles = {
  'mapContainer': {
    'height': '700px', 
    'width': '850px', 
    'margin': 'auto'
  },
  'title': {
    'height': '30px',
    'width': '100%',
    'margin': '10px auto'
  }
}

const gradient = [
  'rgba(0, 255, 255, 0)',
  'rgba(0, 255, 255, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(0, 127, 255, 1)',
  'rgba(0, 63, 255, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(0, 0, 223, 1)',
  'rgba(0, 0, 191, 1)',
  'rgba(0, 0, 159, 1)',
  'rgba(0, 0, 127, 1)',
  'rgba(63, 0, 91, 1)',
  'rgba(127, 0, 63, 1)',
  'rgba(191, 0, 31, 1)',
  'rgba(255, 0, 0, 1)'
]

const deferStateUpdates = (deferFn) => {
  if (typeof deferFn === 'function') {
    setTimeout(deferFn, 0);
  }
}

class HeatMap extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      'heatmap': null,
      'periodstart': null,
      'periodend': null,
    }

    this.initMap = this.initMap.bind(this);
  }

  componentWillMount() {
    if (typeof this.props.LoadMap === 'function') {
      deferStateUpdates(() => {
        this.props.LoadMap();      
      });
    }
    
    if (typeof this.props.LoadLocHistory === 'function') {
      deferStateUpdates(() => {
        this.props.LoadLocHistory();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.heatmap.googlemaps && nextProps.heatmap.googlemaps) {
      //this.initMap(nextProps.heatmap.googlemaps);
    }
  }

  initMap() {
    if (this.state.heatmap) return;

    let { googlemaps, locHist } = this.props.heatmap;
    if (!googlemaps) return;

    //const uluru = {lat: -25.363, lng: 131.044};
    //const sf = { lat: 37.775, lng: -122.434 };

    const center = {
      lat: locHist[0].latitudeE7 * (10 ** -7), 
      lng: locHist[0].longitudeE7 * (10 ** -7) 
    };
    
    const map = new googlemaps.Map(this.mapdiv, {
      center: center, 
      zoom: 12,
      mapTypeId: 'roadmap'
    });

    const marker = new googlemaps.Marker({
      position: center,
      map: map
    });

    const data = locHist.map((val) => {
      return new googlemaps.LatLng(val.latitudeE7 * (10 ** -7), val.longitudeE7 * (10 ** -7));
    });

    const heatmap = new googlemaps.visualization.HeatmapLayer({
      data: data,
      map: map,
      gradient: gradient,
      maxIntensity: 750,
      radius: 20,
      opacity: 0.5
    });

    deferStateUpdates(() => {
      this.setState({ 
        'heatmap': heatmap,
        'periodstart': locHist[locHist.length-1].timestampMs,
        'periodend': locHist[0].timestampMs,
      });
    });
  }

  render() {
    let { heatmap } = this.props;
    let { periodstart, periodend } = this.state;

    let start, end;
    if (periodstart) start = new Date(parseInt(periodstart)).toDateString();
    if (periodend) end = new Date(parseInt(periodend)).toDateString();

    return (
      <div id='map-container'>
        <div style={styles.title}>
          { heatmap.googlemaps ? this.initMap() : "Loading..." }
          { start && end ? `Time range: ${start} ~ ${end}` : "" }
        </div>
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

export default connect(mapStateToProps, { LoadLocHistory, LoadMap })(HeatMap);