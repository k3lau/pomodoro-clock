import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class DisplayTimer extends Component {
  constructor(props) {
    super(props);

    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    this.displayTimeMMSS = this.displayTimeMMSS.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.sleep = this.sleep.bind(this);
  }

  clockInterval = () => {
    let timerID = setTimeout(() => {
      var timeLeft = this.props.timeLeft;
      timeLeft = timeLeft - 1;
      this.props.setTimeLeft(timeLeft);
      this.buzzer(timeLeft);
      if (timeLeft < 0) {
        clearTimeout(this.props.timerID);
        if (this.props.timerType === "Session") {
          this.props.setTimerType("Break");
          this.props.setTimeLeft(this.props.breakLength * 60);
        } else {
          this.props.setTimerType("Session");
          this.props.setTimeLeft(this.props.sessionLength * 60);
        }
        console.log("CHECK HERE");
      }
      this.props.setTimerID(this.clockInterval());
    }, 1000);
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
    this.props.setBreak(5);
    this.props.setSession(25);
    this.props.setTimeLeft(1500);
    this.props.setTimerType("Session");
    clearTimeout(this.props.timerID);
    //console.log(`readyState ${this.audioBeep.readyState}`);
    //console.log(`paused ${this.audioBeep.paused}`);
    //console.log(`ended ${this.audioBeep.ended}`);
    //console.log(`currentTime ${this.audioBeep.currentTime}`);
    //if (this.audioBeep.currentTime > 0 && !this.audioBeep.paused && !this.audioBeep.ended && this.audioBeep.readyState > 2) {
    //  if (this.audioBeep.currentTime > 0 && !this.audioBeep.paused && !this.audioBeep.ended && this.audioBeep.readyState > 0) {
    this.audioBeep.pause();
    //}
    this.audioBeep.currentTime = 0;
    this.props.setTimerStatus(0);
  }

  displayTimeMMSS() {
    let e = this.props.timeLeft;
    let sec = Math.floor(e % 60);
    let min = Math.floor(e / 60);
    let sMinutes = `${min}`.padStart(2, "0");
    let sSeconds = `${sec % 60}`.padStart(2, "0");
    return sMinutes + ":" + sSeconds;
  }

  sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  timerLabel() {
    return this.props.timerType;
  }

  buzzer(_timer) {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  }

  render() {
    return (
      <Container fluid="md">
        <Row>
          <div id="timer-label">{this.timerLabel()}</div>
        </Row>
        <Row>
          <div>
            <p id="time-left">{this.displayTimeMMSS()}</p>
          </div>
        </Row>
        <Row>
          <Button variant="primary" id="start_stop" onClick={this.startStop}>
            Start/Stop
          </Button>
          <Button variant="primary" id="reset" onClick={this.reset}>
            Reset
          </Button>
        </Row>
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          //src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/African%20and%20Eastern%20Percussion/80[kb]african-pe-hi.wav.mp3"
        ></audio>
      </Container>
    );
  }
}
