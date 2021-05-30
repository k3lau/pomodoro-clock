import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { TimerSetting, StyledButton } from "./TimerSetting.elements";

export class SessionLength extends Component {
  constructor(props) {
    super(props);
    this.decre = this.decre.bind(this);
    this.incre = this.incre.bind(this);
  }

  decre() {
    var time = this.props.sessionLength - 1;
    if (time >= 1) {
      this.props.setSession(time);
      if (this.props.timerType === "Session") {
        this.props.setTimeLeft(this.props.timeLeft - 60);
      }
    }
  }

  incre() {
    var time = this.props.sessionLength + 1;
    if (time <= 60) {
      this.props.setSession(time);
      if (this.props.timerType === "Session") {
        this.props.setTimeLeft(this.props.timeLeft + 60);
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="session-label">Session</div>
        <div id="session-length">{`${this.props.sessionLength}`}</div>
        <div>
          <StyledButton
            variant="primary"
            id="session-decrement"
            onClick={this.decre}
          >
            <i class="fas fa-angle-down"></i>
          </StyledButton>
          <StyledButton
            variant="primary"
            id="session-increment"
            onClick={this.incre}
          >
            <i class="fas fa-angle-up"></i>
          </StyledButton>
        </div>
      </React.Fragment>
    );
  }
}
