import "./App.css";
import React, { Component } from "react";
import { TimerControl } from "./Component/TimerControl";
import { DisplayTimer } from "./Component/DisplayTimer";
import "bootstrap/dist/css/bootstrap.min.css";
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
      timerList: [
        {
          id: "Session",
          order: 1,
          length: 25 * 60,
        },
        {
          id: "Break",
          order: 2,
          length: 5 * 60,
        },
        {
          id: "Long Break",
          order: 2,
          length: 5 * 60,
        },
      ],
    };

    this.setBreak = this.setBreak.bind(this);
    this.setSession = this.setSession.bind(this);
    this.setTimeLeft = this.setTimeLeft.bind(this);
    this.setTimerStatus = this.setTimerStatus.bind(this);
    this.setTimerType = this.setTimerType.bind(this);
    this.setTimerID = this.setTimerID.bind(this);
    this.setLength = this.setLength.bind(this);
  }

  setLength(id, time) {
    let timers = [...this.state.timerList];
    let index = timers.findIndex((item) => item.id === id);
    let timer = { ...timers[index] };
    timer.length = time;
    timers[index] = timer;
    this.setState({
      timerList: timers,
    });
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
            setLength={this.setLength}
            setTimerStatus={this.setTimerStatus}
            setTimerType={this.setTimerType}
            setTimerID={this.setTimerID}
            timerList={this.state.timerList}
            timerStatus={this.state.timerStatus}
            timeLeft={this.state.timeLeft}
            timerType={this.state.timerType}
            timerID={this.state.timerID}
          ></DisplayTimer>
        </StyledRow>
        <StyledRow>
          {this.state.timerList.map((item) => (
            <TimerControl
              key={item.id}
              id={item.id}
              length={item.length}
              setLength={this.setLength}
              setTimeLeft={this.setTimeLeft}
              breakLength={this.state.breakLength}
              timeLeft={this.state.timeLeft}
              timerType={this.state.timerType}
            ></TimerControl>
          ))}
        </StyledRow>
      </Layout>
    );
  }
}
