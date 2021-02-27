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
  }

  componentDidUpdate(prevProps) {
    // if(prevProps.value !== this.props.timeLeft) {
    //   this.setState({: this.props.timeLeft});
    // }
  }
  startStop() {
    let status = this.props.timerStatus;
    if (status !== 1) {
      let timerID = setInterval(() => {
        var timeLeft = (this.props.timeLeft * 60 - 1) / 60;
        this.props.setTimeLeft(timeLeft);
      }, 1000);
      this.props.setTimerID(timerID);

      this.props.setTimerStatus(1);
    } else {
      this.props.setTimerStatus(0);
    }
  }

  reset() {
    this.props.setBreak(5);
    this.props.setSession(25);
    this.props.setTimeLeft(this.props.sessionLength);
    clearInterval(this.timer);
    this.setState({
      timerOn: -1,
    });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  displayTimeMMSS() {
    let e = this.props.timeLeft;
    const sec = (e * 60) % 60;
    const min = Math.floor((e * 60) / 60);
    let sMinutes = `${min}`;
    let sSeconds = `${sec % 60}`.padStart(2, "0");
    return sMinutes + ":" + sSeconds;
  }

  timerLabel() {
    if (this.props.timeLeft === 0) {
      if (this.props.timerType === "Session") {
        this.props.setTimerType("Break");
        this.props.setTimeLeft(this.props.breakLength);
      } else {
        this.props.setTimerType("Session");
        this.props.setTimeLeft(this.props.sessionLength);
      }
      console.log("CHECK HERE");
      this.buzzer(1500);
    }

    console.log(`What ${this.props.timeLeft} and ${this.props.timerStatus}`);
    return this.props.timerType;
  }

  buzzer(_timer) {
    if (_timer !== 0) {
      this.audioBeep.play();
    }
  }

  render() {
    return (
      <Container fluid="md">
        <Row>{this.timerLabel()}</Row>
        <Row>
          <div id="time-left">{this.displayTimeMMSS()}</div>
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
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/African%20and%20Eastern%20Percussion/80[kb]african-pe-hi.wav.mp3"
        ></audio>
      </Container>
    );
  }
}
