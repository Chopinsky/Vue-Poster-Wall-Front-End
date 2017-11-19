import React, { Component } from 'react';
import '../assets/Composer.css';

const styles = {
  container: {
    "marginTop": "10px"
  },
  banner: {
    "cursor": "pointer"
  },
  removePhoto: {
    "height": "10px",
    "width": "10px",
    "marginBottom": "10px",
    "fontFamily": "Material Icons",
    "fontWeight": "normal",
    "fontStyle": "normal",
    "lineHeight": "1",
    "letterSpacing": "normal",
    "textTransform": "none",
    "display": "inline-block",
    "whiteSpace": "nowrap",
    "wordWrap": "normal",
    "direction": "ltr"
  },
  hide: {
    "clip": "rect(1px, 1px, 1px, 1px)",
    "height": "0px",
    "width": "0px",
    "overflow": "hidden",
    "position": "absolute !important"
  },
  materialIcon: {
    "fontFamily": "Material Icons",
    "fontWeight": "small",
    "fontStyle": "small",
    "fontSize": "12px",
    "lineHeight": "1",
    "letterSpacing": "normal",
    "textTransform": "none",
    "display": "inline-block",
    "whiteSpace": "nowrap",
    "wordWrap": "normal",
    "direction": "ltr"
  }
}

export default class Composer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "tweet": "",
      "photos": [], // ["https://static.pexels.com/photos/207962/pexels-photo-207962.jpeg"],
      "isOpen": true
    }

    this.initBinding();
  }

  initBinding() {
    this.getInnerAreaStyle = this.getInnerAreaStyle.bind(this);
    this.getPhotosFrame = this.getPhotosFrame.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
    this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
    this.handleUploadButtonClick = this.handleUploadButtonClick.bind(this);
    this.uploadOnePhoto = this.uploadOnePhoto.bind(this);
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

  handlePhotoUpload(event) {
    event.stopPropagation();
    event.preventDefault();

    const files = event.target.files;
    if (!files || files.length < 1) {
      return;
    }

    // "files" is not an array, but an object with length property,
    // and each member has a key of 0, 1, 2, ..., length-1.
    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        this.uploadOnePhoto(files[i]);
      }
    }
  }

  uploadOnePhoto(file) {
    let reader = new FileReader();
    
    reader.onloadend = (event) => {
      if (event && event.target && event.target.result) {
        const photos = [...this.state.photos, event.target.result];
        this.setState({ "photos": photos });
      }
    }

    reader.readAsDataURL(file)
  }

  handleUploadButtonClick(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.photoUploadControl) {
      this.photoUploadControl.click();
    }
  }

  removePhoto(index) {
    if (index < 0 || index > this.state.photos.length - 1) {
      // out of bound
      return;
    }

    let { photos } = this.state;
    photos.splice(index, 1);
    this.setState({ "photos": photos });
  }

  getInnerAreaStyle() {
    return {
      "display": this.state.isOpen ? "block" : "none"
    }
  }

  getPhotosFrame() {
    let { photos } = this.state;

    if (!photos || !photos.length) {
      return;
    } else {
      const photosFrame = photos.map((photo, index) => (
        <div key={index} className="mv0 ml0 mr3 relative flex items-center justify-center">
          <button onClick={this.removePhoto.bind(this, index)} className="button-reset pointer dim bn bg-black h2 w2 br-100 white flex items-center justify-center absolute absolute--fill-l center">
            <span className="f5 glyphicon glyphicon-remove" style={styles.removePhoto}></span>
          </button>
          <img className="h3 w3" src={photo} alt=""/>
        </div>
      ));

      return (
        <div className="bg-black-10 pa2 flex">
          {photosFrame}
        </div>
      );
    }
  }

  render() {
    return (
      <div id="divContainer" style={styles.container} className="w-75 center ba b--black-10">
        <div style={styles.banner} className="pv2 tc bb b--black-10 hover-effect" onClick={this.handleToggle}>
          <h1 className="ma0 f5 normal">Write On The Wall</h1>
        </div>

        <div style={ this.getInnerAreaStyle() } className="bg-near-white pa3" >
          <textarea 
            id="tweet" name="tweet" rows="3"
            className="w-100 br2 ba b--black-10 pa2"
            value={this.state.tweet} onChange={this.handleTweet}
            placeholder="Write your thoughts here" 
          />
          
          {this.getPhotosFrame()}

          <input 
            multiple type="file" style={styles.hide}
            onChange={this.handlePhotoUpload} 
            ref={(input) => {this.photoUploadControl = input;}} 
          />

          <div className="mt3 flex justify-between">
            <div>
              <button 
                onClick={this.handleUploadButtonClick} 
                className="button-reset flex items-center br2 bn bg-transparent blue hover-bg-black-10 pointer"
              >
                <i className="f5 glyphicon glyphicon-camera" style={styles.materialIcon}>camera</i>
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}