import React, { Component } from "react";
import {
  DisplayContainer,
  StyledButton,
  StyledRow,
  TimerSetting,
  TimeFormat,
} from "./TimerSetting.elements.js";
import { displayTimeMMSS } from "../Util/TimeFormat.js";

const size = 100;
const strokeWidth = 4;
const rotation = "clockwise";

const wrapperStyle = {
  position: "relative",
  width: "10em",
  maxWidth: "100%",
  height: "100%",
};
const timeStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};
const getPathProps = (size, strokeWidth, rotation) => {
  const halfSize = size / 2;
  const halfStrokeWith = strokeWidth / 2;
  const arcRadius = halfSize - halfStrokeWith;
  const arcDiameter = 2 * arcRadius;
  const rotationIndicator = rotation === "counterclockwise" ? "1,0" : "0,1";

  const pathLength = 2 * Math.PI * arcRadius;
  const path = `m ${halfSize},${halfStrokeWith}
              a ${arcRadius},${arcRadius} 0 ${rotationIndicator} 0,${arcDiameter}
              a ${arcRadius},${arcRadius} 0 ${rotationIndicator} 0,-${arcDiameter}`;

  return { path, pathLength };
};
const { path, pathLength } = getPathProps(size, strokeWidth, rotation);
const strokeDashoffset = (time, start, goal, duration) => {
  if (duration === 0) {
    return goal;
  }

  const currentTime = time / duration;
  return start + goal * currentTime;
};

// const strokeDashoffset = linearEase(elapsedTime, 0, pathLength, duration);

export class DisplayTimer extends Component {
  constructor(props) {
    super(props);

    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.duration = this.duration.bind(this);
  }

  clockInterval = () => {
    let timerID = setTimeout(() => {
      var timeLeft = this.props.timeLeft;
      timeLeft = timeLeft - 1 / 60;
      this.props.setTimeLeft(timeLeft);
      this.buzzer(timeLeft);
      if (timeLeft < 0) {
        clearTimeout(this.props.timerID);
        if (this.props.timerType === "Session") {
          this.props.setTimerType("Break");
          this.props.setTimeLeft(this.props.breakLength);
        } else {
          this.props.setTimerType("Session");
          this.props.setTimeLeft(this.props.sessionLength);
        }
        console.log("CHECK HERE");
      }
      this.props.setTimerID(this.clockInterval());
    }, 1000 / 60);
    return timerID;
  };

  startStop(e = 0) {
    let status = this.props.timerStatus;
    console.log(`Button ${status} and ${e}`);
    if (status === 0) {
      let timerID = this.clockInterval();
      this.props.setTimerID(timerID);

      this.props.setTimerStatus(1);
    } else {
      clearTimeout(this.props.timerID);
      this.props.setTimerStatus(0);
    }
  }

  reset() {
    this.props.setBreak(300);
    this.props.setSession(1500);
    this.props.setTimeLeft(1500);
    this.props.setTimerType("Session");
    clearTimeout(this.props.timerID);

    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.props.setTimerStatus(0);
  }

  timerLabel() {
    return this.props.timerType;
  }

  duration() {
    return this.props.timerType === "Session"
      ? this.props.sessionLength * 1000
      : this.props.breakLength * 1000;
  }

  buzzer(_timer) {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  }

  render() {
    return (
      <TimerSetting>
        <DisplayContainer size={size}>
          <div style={wrapperStyle}>
            <svg
              width="100%"
              height="100%"
              preserveAspectRatio="xMinYMin slice"
              viewBox="0 0 100 100"
              xmlns="https://www.w3.org/2000/svg"
            >
              <path
                d={path}
                stroke="grey"
                strokeLinecap="round"
                cx={size / 2}
                cy={size / 2}
                r={size / 2 - 4}
                strokeWidth={strokeWidth}
                fill="none"
              />
              <path
                d={path}
                stroke="red"
                strokeLinecap="round"
                cx={size / 2}
                cy={size / 2}
                r={size / 2 - 4}
                fill="none"
                strokeWidth={strokeWidth}
                strokeDasharray={pathLength}
                strokeDashoffset={strokeDashoffset(
                  this.props.timeLeft * 1000,
                  0,
                  pathLength,
                  this.duration()
                )}
              />
            </svg>

            <div style={timeStyle}>
              <div id="timer-label">{this.timerLabel()}</div>
              <TimeFormat id="time-left">
                {displayTimeMMSS(this.props.timeLeft)}
              </TimeFormat>
              <StyledRow>
                <StyledButton
                  variant="primary"
                  id="start_stop"
                  onClick={this.startStop}
                >
                  {this.props.timerStatus === 1 ? (
                    <i className="fas fa-stop fa-sm"></i>
                  ) : (
                    <i className="fas fa-play fa-sm"></i>
                  )}
                </StyledButton>
                <StyledButton variant="primary" id="reset" onClick={this.reset}>
                  <i className="fas fa-undo fa-sm"></i>
                </StyledButton>
              </StyledRow>
            </div>
          </div>
          <audio
            id="beep"
            preload="auto"
            ref={(audio) => {
              this.audioBeep = audio;
            }}
            //src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/African%20and%20Eastern%20Percussion/80[kb]african-pe-hi.wav.mp3"
          ></audio>
        </DisplayContainer>
      </TimerSetting>
    );
  }
}
