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
      "tweet": "",
      "isOpen": true
    }

    this.initBinding();
  }

  initBinding() {
    this.getInnerAreaStyle = this.getInnerAreaStyle.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
  }

  handleToggle(event) {
    event.stopPropagation();
    event.preventDefault();

    let { isOpen } = this.state;
    this.setState({ "isOpen": !isOpen });
  }

  handleTweet(event) {    
    event.stopPropagation();
    event.preventDefault();

    this.setState({ "tweet": event.target.value });
  }

  getInnerAreaStyle() {
    return {
      "display": this.state.isOpen ? "block" : "none"
    }
  }

  render() {
    return (
      <div id="divContainer" style={containerStyle} className="w-75 center ba b--black-10">
        <div style={bannerStyle} className="pv2 tc bb b--black-10 hover-effect" onClick={this.handleToggle}>
          <h1 className="ma0 f5 normal">Write On The Wall</h1>
        </div>

        <div style={ this.getInnerAreaStyle() } className="bg-near-white pa3" >
          <textarea id="tweet" name="tweet" rows="3"
                    className="w-100 br2 ba b--black-10 pa2"
                    value={this.state.tweet} onChange={this.handleTweet}
                    placeholder="Write your thoughts here" />
          Composer Body
        </div>
      </div>
    );
  }
}