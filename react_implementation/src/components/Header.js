import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg';

const headerStyle = {
  width: "850px",
  color: "white"
}

const LinkEnum = {
  Home: "home",
  Tracker: "tracker"
}

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.onClickHandle = this.onClickHandle.bind(this);
  }

  getLinkStyle(link) {
    if (this.props.activeLink === link) {
      return "nav-item active";
    } else {
      return "nav-item";
    }    
  }

  onClickHandle(event, target) {
    event.stopPropagation();
    event.preventDefault();
    
    if (this.props.onLinkClicked 
        && typeof this.props.onLinkClicked === 'function'
        && this.props.activeLink !== target) {
      this.props.onLinkClicked(event.target);
    }
  }

  render() {
    return (
      <div style={headerStyle}>
        <div className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#home">
            <img src={logo} style={{ "marginTop": "-5px" }} width="38" height="38" alt="Scribble Wall" />
            Scribble Wall
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className={this.getLinkStyle(LinkEnum.Home)}>
                <Link to='/' className="nav-link">Home</Link>
              </li>
              <li className={this.getLinkStyle(LinkEnum.Tracker)}>
                <Link to='/traker' className="nav-link">Tracker</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    );
  }
}
