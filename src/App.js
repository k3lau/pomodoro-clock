import "./App.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { BreakLength } from "./Component/BreakLength";
import { SessionLength } from "./Component/SessionLength";
import { DisplayTimer } from "./Component/DisplayTimer";
import "bootstrap/dist/css/bootstrap.min.css";

function durationSecondToMMSS(duration) {
  const sec = duration % 60;
  const min = Math.floor(duration / 60);
  let sMinutes = `${min}`;
  let sSeconds = `${sec}`.padStart(2, "0");
  return sMinutes + ":" + sSeconds;
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: 0.05,
      breakLength: 0.1,
      sessionLength: 0.05,
      timerStatus: -1,
      timerType: "Session",
      timerID: 0,
    };

    this.setBreak = this.setBreak.bind(this);
    this.setSession = this.setSession.bind(this);
    this.setTimeLeft = this.setTimeLeft.bind(this);
    this.setTimerStatus = this.setTimerStatus.bind(this);
    this.setTimerType = this.setTimerType.bind(this);
    this.setTimerID = this.setTimerID.bind(this);
  }

  setBreak(e) {
    this.setState({
      breakLength: e,
    });
  }

  setSession(e) {
    this.setState({
      sessionLength: e,
    });
  }

  setTimeLeft(e) {
    if (e <= 0) {
      e = 0;

      console.log("CHECK HERE 2 ");
    }

    this.setState((state, props) => ({
      timeLeft: e,
    }));
  }

  setTimerStatus(e) {
    if (e === 0) {
      clearInterval(this.state.timerID);
    }
    this.setState({
      timerStatus: e,
    });
  }

  setTimerType(e) {
    this.setState({
      timerType: e,
    });
  }

  setTimerID(e) {
    this.setState({
      timerID: e,
    });
  }

  render() {
    return (
      <div className="app">
        <BreakLength
          setBreak={this.setBreak}
          setTimer={this.setTimeLeft}
          setTimerStatus={this.setTimerStatus}
          setTimeLeft={this.setTimeLeft}
          breakLength={this.state.breakLength}
          timerStatus={this.state.timerStatus}
          timeLeft={this.state.timeLeft}
        ></BreakLength>
        <SessionLength
          setSession={this.setSession}
          setTimer={this.setTimeLeft}
          setTimerStatus={this.setTimerStatus}
          setTimeLeft={this.setTimeLeft}
          sessionLength={this.state.sessionLength}
          timerStatus={this.state.timerStatus}
          timeLeft={this.state.timeLeft}
        ></SessionLength>
        <DisplayTimer
          setTimeLeft={this.setTimeLeft}
          setSession={this.setSession}
          setBreak={this.setBreak}
          setTimerStatus={this.setTimerStatus}
          setTimerType={this.setTimerType}
          setTimerID={this.setTimerID}
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          timerStatus={this.state.timerStatus}
          timeLeft={this.state.timeLeft}
          timerType={this.state.timerType}
          timerID={this.state.timerID}
        ></DisplayTimer>
      </div>
    );
  }
}
