import React, { Component } from "react";
import {
  TimerSetting,
  SettingContainer,
  StyledButton,
  StyledRow,
} from "./TimerSetting.elements";
import { displayTimeMMSS } from "../Util/TimeFormat";
import { DisplayTimer } from "./DisplayTimer";

export class SessionLength extends Component {
  constructor(props) {
    super(props);
    this.decre = this.decre.bind(this);
    this.incre = this.incre.bind(this);
  }

  decre() {
    var time = this.props.sessionLength - 60;
    if (time >= 10) {
      this.props.setSession(time);
      if (this.props.timerType === "Session") {
        this.props.setTimeLeft(this.props.timeLeft - 60);
      }
    }
  }

  incre() {
    var time = this.props.sessionLength + 60;
    if (time <= 3600) {
      this.props.setSession(time);
      if (this.props.timerType === "Session") {
        this.props.setTimeLeft(this.props.timeLeft + 60);
      }
    }
  }

  render() {
    return (
      <TimerSetting>
        <SettingContainer>
          <div id="session-label">Session</div>
          <div id="session-length">{`${displayTimeMMSS(
            this.props.sessionLength
          )}`}</div>
          <StyledRow>
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
          </StyledRow>
        </SettingContainer>
      </TimerSetting>
    );
  }
}
