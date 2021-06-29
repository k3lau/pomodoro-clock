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

    this.state = {
      currentIndex: this.props.timerList.findIndex(
        (item) => item.order === this.props.timerType
      ),
    };
  }

  clockInterval = () => {
    let timeScale = 1;
    let timerID = setTimeout(() => {
      var timeLeft = this.props.timeLeft;
      timeLeft = timeLeft - 1 / timeScale;
      this.props.setTimeLeft(timeLeft);
      this.buzzer(timeLeft);
      if (timeLeft < 0) {
        clearTimeout(this.props.timerID);
        if (this.state.currentIndex < this.props.timerList.length - 1) {
          this.setState((state) => {
            return { currentIndex: state.currentIndex + 1 };
          });
        } else {
          this.setState({
            currentIndex: 0,
          });
        }
        this.props.setTimerType(
          this.props.timerList[this.state.currentIndex].order
        );
        this.props.setTimeLeft(
          this.props.timerList[this.state.currentIndex].length
        );
      }
      this.props.setTimerID(this.clockInterval());
    }, 1000 / 60);
    return timerID;
  };

  startStop(e = 0) {
    let status = this.props.timerStatus;

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
    this.props.setLength("Break", 300);
    this.props.setLength("Session", 1500);
    this.props.setTimerType(1);
    clearTimeout(this.props.timerID);
    let items = Array.from(this.props.timerList);
    items = items.map((item, index) => {
      const newItem = {...item};
      newItem.order = index + 1
      return newItem
    });
    this.props.setTimerList(items)
    this.props.setTimeLeft(items[0].length);


    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.props.setTimerStatus(0);
  }

  timerLabel() {
    const timers = [...this.props.timerList];
    const label = timers.find((item) => {
      if (item.order === this.props.timerType) {
        return item;
      }
    });
    return label.name;
  }

  duration() {
    const timers = [...this.props.timerList];
    const length = timers.find((item) => {
      if (item.order === this.props.timerType) {
        return item;
      }
    });
    return length.length * 1000;
  }

  buzzer(_timer) {
    if (_timer <= 0) {
      this.audioBeep.play();
    }
  }

  render() {
    return (
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
    );
  }
}
