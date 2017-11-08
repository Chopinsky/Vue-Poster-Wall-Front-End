import React, { Component } from 'react';
import '../assets/Composer.css';

const containerStyle = {
  "marginTop": "10px"
}

const bannerStyle = {
  "cursor": "pointer"
}

export default class Composer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "isOpen": true
    }

    this.initBinding();
  }

  initBinding() {
    this.getInnerAreaStyle = this.getInnerAreaStyle.bind(this);
  }

  toggleModal(e) {
    e.stopPropagation();
    e.preventDefault();

    let { isOpen } = this.state;
    this.setState({ "isOpen": !isOpen });
  }

  getInnerAreaStyle() {
    return {
      "display": this.state.isOpen ? "block" : "none"
    }
  }

  render() {
    return (
      <div id="divContainer" style={containerStyle} className="w-75 center ba b--black-10">
        <div style={bannerStyle} className="pv2 tc bb b--black-10 hover-effect" onClick={ this.toggleModal.bind(this) }>
          <h1 className="ma0 f5 normal">Write On The Wall</h1>
        </div>

        <div style={ this.getInnerAreaStyle() } >
          Composer Body
        </div>
      </div>
    );
  }
}