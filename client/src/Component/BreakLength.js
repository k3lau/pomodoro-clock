import React, { Component } from "react";
import {
  SettingContainer,
  StyledButton,
  StyledRow,
  TimeFormat,
} from "./TimerSetting.elements.js";
import { displayTimeMMSS } from "../Util/TimeFormat";

export class BreakLength extends Component {
  constructor(props) {
    super(props);
    this.decre = this.decre.bind(this);
    this.incre = this.incre.bind(this);
  }

  decre() {
    var time = this.props.breakLength - 60;
    if (time >= 10) {
      this.props.setBreak(time);
      if (this.props.timerType === "Break") {
        this.props.setTimeLeft(this.props.timeLeft - 60);
      }
    }
  }

  incre() {
    var time = this.props.breakLength + 60;
    if (time <= 3600) {
      this.props.setBreak(time);
      if (this.props.timerType === "Break") {
        this.props.setTimeLeft(this.props.timeLeft + 60);
      }
    }
  }

  render() {
    return (
      <SettingContainer>
        <div id="break-label">Break</div>
        <StyledRow>
          <StyledButton
            variant="primary"
            id="break-decrement"
            onClick={this.decre}
          >
            <i className="fas fa-angle-down fa-sm"></i>
          </StyledButton>
          <TimeFormat id="break-length">{`${displayTimeMMSS(
            this.props.breakLength
          )}`}</TimeFormat>
          <StyledButton
            variant="primary"
            id="break-increment"
            onClick={this.incre}
          >
            <i className="fas fa-angle-up fa-sm"></i>
          </StyledButton>
        </StyledRow>
      </SettingContainer>
    );
  }
}
