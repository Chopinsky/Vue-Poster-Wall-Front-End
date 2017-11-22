import React, { Component } from 'react';
import { connect } from 'react-redux';

import jquery from 'jquery';
import Constant from '../service/Constants.js';
import FetchCoinData from '../service/DataService';

import TrackerHeader from './TrackerHeader';

class Tracker extends Component {
  constructor(props) {
    super(props);

    this.renderSymbols = this.renderSymbols.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.FetchCoinData === 'function') {
      this.props.FetchCoinData();
    } else {
      this.fetchDataNative();
    }
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

  renderSymbols() {
    if (!this.props.crypto.data || !this.props.crypto.data.length) {
      return <div>Fetching data..."</div>;
    } else {
      return this.props.crypto.data.map((value, index) => {
        return (
          <div key={index}>
            {value.name} : ${value.price_usd} / {value.symbol} 
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <TrackerHeader />
        {this.renderSymbols()}
      </div>
    );
  }
}

// map new states to props: fetched by action (data service), new states are 
// then prepared by reducer, and lastly supplied via connect.
const mapStateToProps = (state) => {
  return {
    crypto: state.crypto
  }
}

export default connect(mapStateToProps, { FetchCoinData })(Tracker);