import anime from 'animejs/lib/anime.es.js';
import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../action_creators";

export class StandaloneButton extends Component {
  constructor(props) {
    super(props);

    this.btnRef = React.createRef()
    this.state = {
      playing: false
    }
  }

  render() {
    let src = `/assets/sounds/${this.props.file}`;
    window.addEventListener("keydown", e => {
      if (e.key === this.props.key_press) {
        this.btnRef.current.click()
      }
      return;
    });

    console.log(/^[a-z]$/.test(this.props.key_press));

    return (
        <button
          className="button"
          id={this.props.id}
          onClick={this.buttonClick}
          ref={this.btnRef}
        >
          <div className="title" style={{color: this.state.playing ? "#FF00FF" : ""}}>{/^[a-z]$/.test(this.props.key_press) ? this.props.key_press.toUpperCase() : this.props.key_press}</div>
          <audio
            src={src}
            preload="auto"
            ref={(tag) => { this._audioTag = tag; }}
            onEnded={() => { this.setState({playing: false}); anime({ targets: `#${this.props.id}`, scale: 1 })}}
            onPause={() => { this.setState({playing: false}); anime({ targets: `#${this.props.id}`, scale: 1 })}}
            onPlaying={() => { this.setState({playing: true}); }}
          ></audio>
        </button>
    );
  }

  buttonClick = () => {
    if (this.state.playing) {
      this._audioTag.pause();
    } else {
      this._audioTag.currentTime = 0.0;
      this._audioTag.volume = this.props.volume / 100;
      this._audioTag.play();
      anime({
        targets: `#${this.props.id}`,
        scale: 1.5
      })
    }
  }

  getButtonStyles = () => {
    return {
      "backgroundColor": this.props.button_color
    };
  }

  getStateStyles = () => {
    return {
      "backgroundColor": this.state.playing ? this.props.playing_color : ""
    };
  }
}

export const Button = connect(
  (state) => {
    return {volume: state.volume};
  },
  actionCreators
)(StandaloneButton);
