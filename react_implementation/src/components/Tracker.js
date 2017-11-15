import React, { Component } from 'react';
import { connect } from 'react-redux';

import TrackerHeader from './TrackerHeader';

class Tracker extends Component {
  render() {
    return (
      <div>
        <TrackerHeader />
        <h3>Container</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    crypto: state.crypto
  }
}

export default connect(mapStateToProps)(Tracker);