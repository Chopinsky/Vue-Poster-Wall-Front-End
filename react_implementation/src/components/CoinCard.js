import React, { Component } from 'react';

const styles = {
  card: {
    "display": "block",
    "position": "relative",
    "height": "50px",
    "padding": "10px 50px",
    "left": 0
  },
  name: {
    "display": "inline-block",
    "position": "absolute",
    "textAlign": "left",
    "left": "175px",
    "width": "50%",
    "overflow": "wrap"
  },
  price: {
    "display": "inline-block",
    "position": "absolute",
    "textAlign": "right",
    "right": "175px",
    "width": "50%",
    "overflow": "wrap"
  }
}

export default class CoinCard extends Component {
  render() {
    const { data } = this.props;
    return (
      <div style={styles.card}>
        <div style={styles.name}>
          {data.name}
        </div>
        <div style={styles.price}>
          ${data.price_usd} / {data.symbol} 
        </div>
      </div>
    );
  }
}