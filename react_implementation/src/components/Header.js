import React, { Component } from 'react';
import logo from '../assets/logo.svg';

const headerStyle = {
  width: "850px",
  color: "white"
}

export default class Header extends Component {
  render() {
    return (
      <div style={headerStyle}>
        <div className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#home">
            <img src={logo} width="40" height="40" alt="Scribble Wall" />
            Scribble Wall
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#home">Home <span className="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    );
  }
}
