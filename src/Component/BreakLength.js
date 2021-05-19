import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { TimerSetting, StyledButton } from "./TimerSetting.elements";

export class BreakLength extends Component {
  constructor(props) {
    super(props);
    this.decre = this.decre.bind(this);
    this.incre = this.incre.bind(this);
  }

  decre() {
    var time = this.props.breakLength - 1;
    if (time >= 1) {
      this.props.setBreak(time);
      if (this.props.timerType === "Break") {
        this.props.setTimeLeft(this.props.timeLeft - 60);
      }
    }
  }

  incre() {
    var time = this.props.breakLength + 1;
    if (time <= 60) {
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

        <div id="break-length">{`${this.props.breakLength}`}</div>
        <div>
          <StyledButton
            variant="primary"
            id="break-decrement"
            onClick={this.decre}
          >
            <i class="fas fa-angle-down"></i>
          </StyledButton>
          <StyledButton
            variant="primary"
            id="break-increment"
            onClick={this.incre}
          >
            <i class="fas fa-angle-up"></i>
          </StyledButton>
        </div>
      </TimerSetting>
    );
  }
}
