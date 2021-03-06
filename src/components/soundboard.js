import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../action_creators";
import { Button } from "./button";
import { Volumeslider } from "./volumeslider";

require("../assets/css/main.scss");

const BUTTON_SIZE = 80;

export class StandaloneSoundboard extends Component {
  componentDidMount() {
    this.props.loadConfig();
  }

  render() {
    let content;
    if (this.props.fetching) {
      content = this.getLoadingMessage();
    } else {
      content = this.getSoundboard();
    }

    return content;
  }

  getLoadingMessage = () => {
    return (
      <div className="fullscreenmessage">
        <h1>Loading...</h1>
      </div>
    );
  }

  getSoundboard = () => {
    return (
      <>
        <Volumeslider />
        <div className="soundboardWrapper">
          <section
            id="soundboard"
            className="soundboard"
            style={this.getSoundboardStyles()}
          >
            {this.props.config.sounds.filter(sound => sound.theme === "fun").map((sound) => {
              return (
              <div className="buttonWrapper" key={sound.file}>
                <Button
                  file={sound.file}
                  id={sound.id}
                  key_press={sound.keyPress}
                  title={sound.title}
                  playing_color={this.props.config.colors.playing}
                />
                <p className="keypress">{sound.title}</p>
            </div>);
            })}
          </section>

          <section
            id="soundboard2"
            className="soundboard"
            style={this.getSoundboardStyles()}
          >
            {this.props.config.sounds.filter(sound => sound.theme === "throwdown").map((sound) => {
              return (
              <div className="buttonWrapper" key={sound.file}>
                <Button
                  file={sound.file}
                  id={sound.id}
                  key_press={sound.keyPress}
                  title={sound.title}
                  playing_color={this.props.config.colors.playing}
                />
                <p className="keypress">{sound.title}</p>
            </div>);
            })}
          </section>
        </div>
      </>
    );
  }

  getSoundboardStyles = () => {
    let screenRes = document.querySelector("html").clientWidth / document.querySelector("html").clientHeight,
      x = 1,
      y = 1;

    while ((x * y) < this.props.config.sounds.length) {
      var solRes = x / (4*y);

      if (solRes < screenRes) {
        x++;
      } else {
        y++;
      }
    }

    let boardWidth = (BUTTON_SIZE + 30) * x,
      boardHeight = (BUTTON_SIZE + 60) * y;

    return {
      "width": boardWidth,
      "height": boardHeight
    };
  }
}

export const Soundboard = connect(
  state => state,
  actionCreators
)(StandaloneSoundboard);
