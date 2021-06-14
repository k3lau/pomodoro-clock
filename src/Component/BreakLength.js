import React, { Component } from "react";
import {
  TimerSetting,
  StyledButton,
  StyledRow,
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
      <TimerSetting>
        <div id="break-label">Break</div>

        <div id="break-length">{`${displayTimeMMSS(
          this.props.breakLength
        )}`}</div>
        <StyledRow>
          <StyledButton
            variant="primary"
            id="break-decrement"
            onClick={this.decre}
          >
            <i class="fas fa-angle-down fa-sm"></i>
          </StyledButton>
          <StyledButton
            variant="primary"
            id="break-increment"
            onClick={this.incre}
          >
            <i class="fas fa-angle-up fa-sm"></i>
          </StyledButton>
        </StyledRow>
      </TimerSetting>
    );
  }
}
