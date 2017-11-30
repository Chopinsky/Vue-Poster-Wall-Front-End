import React, { Component } from 'react';

export default class CoinCard extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        {data.name} : ${data.price_usd} / {data.symbol} 
      </div>
    );
  }
}