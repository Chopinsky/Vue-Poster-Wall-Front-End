import React, { Component } from 'react';

const styles = {
  headerContainer: {
    display: "flex",
    marginTop: 25,
    alignItems: "center",
  },
  header: {
    backgroundColor: "#f8f9fa",
    padding: "10px 75px",
    margin: "auto",
    fontWeight: "bold",
    fontSize: 20,
  }
}

export default class TrackerHeader extends Component {
  render() {
    return (
      <div style={styles.headerContainer}>
        <span style={styles.header}>
          Crypto-Currency App
        </span>
      </div>
    );
  }
}