import React, { Component } from 'react';
import { connect } from 'react-redux';

import jquery from 'jquery';
import Constant from '../service/Constants.js';

import TrackerHeader from './TrackerHeader';

class Tracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "data": []
    }

    this.fetchDataNative();
  }

  fetchDataNative() {
    jquery.get(`${Constant.apiBaseURL}/v1/ticker/?limit=10`)
          .then((res) => {
            this.setState({ "data": res });
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
  }

  render() {
    const symbols = this.state.data.map((value, index) => {
      return (
        <div key={index}>
          {value.name} : ${value.price_usd} / {value.symbol}
        </div>
      );
    });

    return (
      <div>
        <TrackerHeader />
        {symbols}
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