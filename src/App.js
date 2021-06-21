import "./App.css";
import React, { Component } from "react";
import { TimerControl } from "./Component/TimerControl";
import { DisplayTimer } from "./Component/DisplayTimer";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Layout,
  StyledRow,
  StyledCol,
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
          order: 3,
          length: 5 * 60,
        },
      ],
      dragID: 0,
    };

    this.setBreak = this.setBreak.bind(this);
    this.setSession = this.setSession.bind(this);
    this.setTimeLeft = this.setTimeLeft.bind(this);
    this.setTimerStatus = this.setTimerStatus.bind(this);
    this.setTimerType = this.setTimerType.bind(this);
    this.setTimerID = this.setTimerID.bind(this);
    this.setLength = this.setLength.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrag(e) {
    this.setState({
      dragID: e.currentTarget.id,
    });
  }

  handleDrop(e) {
    let timers = [...this.state.timerList];
    console.log(`${typeof this.state.dragID} and ${typeof e.currentTarget.id}`);
    if (
      typeof this.state.dragID === "undefined" ||
      typeof e.currentTarget.id === "undefined"
    ) {
      return null;
    }

    const dragBox = timers.find(
      (item) => item.order.toString() === this.state.dragID
    );
    const dropBox = timers.find(
      (item) => item.order.toString() === e.currentTarget.id
    );
    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    console.info(timers);
    const newBoxState = timers.map((item) => {
      console.log(`${item.id} and ${item.order} and ${typeof item.order}`);
      console.log(`${this.state.dragID} and ${typeof this.state.dragID}`);
      console.log(`${e.currentTarget.id} and ${typeof e.currentTarget.id}`);
      console.log(
        `dragbox order ${dragBoxOrder} and dropbox order ${dropBoxOrder}`
      );
      if (item.order.toString() === this.state.dragID) {
        item.order = dropBoxOrder;
        console.log(`${item.id} change to ${dropBoxOrder}`);
      } else {
        if (item.order.toString() === e.currentTarget.id) {
          console.log(`${item.id} change to ${dragBoxOrder}`);
          item.order = dragBoxOrder;
        }
      }
      return item;
    });
    console.info(newBoxState);
    this.setState({
      timerList: newBoxState,
    });
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
        <StyledRow>
          <h1>Podomoro</h1>
        </StyledRow>
        <StyledRow>
          <Paragraph>- Kiet Lau -</Paragraph>
        </StyledRow>
        <StyledRow>
          <Paragraph>
            Podomoro timer built with ReactJS and styled-component
          </Paragraph>
        </StyledRow>
        <StyledRow>
          <StyledCol>
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
          </StyledCol>
          <StyledCol>
            {this.state.timerList
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <TimerControl
                  key={item.id}
                  id={item.id}
                  order={item.order}
                  length={item.length}
                  setLength={this.setLength}
                  setTimeLeft={this.setTimeLeft}
                  breakLength={this.state.breakLength}
                  timeLeft={this.state.timeLeft}
                  timerType={this.state.timerType}
                  handleDrag={this.handleDrag}
                  handleDrop={this.handleDrop}
                ></TimerControl>
              ))}
          </StyledCol>
        </StyledRow>
      </Layout>
    );
  }
}
