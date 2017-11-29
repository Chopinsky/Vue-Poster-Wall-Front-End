import React, { Component } from 'react';
import { connect } from 'react-redux';
import jquery from 'jquery';

import TrackerHeader from './TrackerHeader';
import CoinCard from './CoinCard';
import Constant from '../service/Constants';
import { FetchCoinData } from '../service/ActionService';

const styles = {
  symbols: {
    "margin": "10px 0"
  }
}

class Tracker extends Component {
  constructor(props) {
    super(props);

    this.renderSymbols = this.renderSymbols.bind(this);
    this.refreshCoinData = this.refreshCoinData.bind(this);
  }

  componentDidMount() {
    this.refreshCoinData(null);
  }

  refreshCoinData(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

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
    if (this.props.crypto.isFetching) {
      return <div>Fetching data...</div>;
    } else if (!this.props.crypto.data || !this.props.crypto.data.length) {
      return <div>Unable to retrieve data...</div>;
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
        <div id="divContentWrapper" style={styles.symbols}>
          {this.renderSymbols()}
        </div>
        <div id="btnRefresh">
          <button type="button" onClick={this.refreshCoinData}>Refresh Coin Data</button>
        </div>
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