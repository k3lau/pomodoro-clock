import "./App.css";
import React, { Component } from "react";
import { BreakLength } from "./Component/BreakLength";
import { SessionLength } from "./Component/SessionLength";
import { DisplayTimer } from "./Component/DisplayTimer";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import {
  Layout,
  StyledRow,
  Paragraph,
} from "./Component/TimerSetting.elements";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: 1500,
      breakLength: 300,
      sessionLength: 1500,
      timerStatus: 0,
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
    this.setState((state, props) => ({
      timeLeft: e,
    }));
  }

  setTimerStatus(e) {
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
      <Layout>
        <h1>Podomoro</h1>
        <Paragraph>- Kiet Lau -</Paragraph>
        <Paragraph>
          Podomoro timer built with ReactJS and styled-component
        </Paragraph>
        <StyledRow>
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
        </StyledRow>
        <StyledRow>
          <BreakLength
            setBreak={this.setBreak}
            setTimer={this.setTimeLeft}
            setTimerStatus={this.setTimerStatus}
            setTimeLeft={this.setTimeLeft}
            breakLength={this.state.breakLength}
            timerStatus={this.state.timerStatus}
            timeLeft={this.state.timeLeft}
            timerType={this.state.timerType}
          ></BreakLength>
          <SessionLength
            setSession={this.setSession}
            setTimer={this.setTimeLeft}
            setTimerStatus={this.setTimerStatus}
            setTimeLeft={this.setTimeLeft}
            sessionLength={this.state.sessionLength}
            timerStatus={this.state.timerStatus}
            timeLeft={this.state.timeLeft}
            timerType={this.state.timerType}
          ></SessionLength>
        </StyledRow>
      </Layout>
    );
  }
}
