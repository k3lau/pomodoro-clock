import React, { Component } from "react";
import {
  SettingContainer,
  StyledButton,
  StyledRow,
  TimeFormat,
} from "./TimerSetting.elements.js";
import { displayTimeMMSS } from "../Util/TimeFormat";

export class TimerControl extends Component {
  constructor(props) {
    super(props);
    this.decre = this.decre.bind(this);
    this.incre = this.incre.bind(this);
  }

  decre() {
    var time = this.props.length - 60;
    if (time >= 10) {
      this.props.setLength(this.props.id, time);
      if (this.props.timerType === this.props.id) {
        this.props.setTimeLeft(this.props.timeLeft - 60);
      }
    }
  }

  incre() {
    var time = this.props.length + 60;
    if (time <= 3600) {
      this.props.setLength(this.props.id, time);
      if (this.props.timerType === this.props.id) {
        this.props.setTimeLeft(this.props.timeLeft + 60);
      }
    }
  }

  render() {
    return (
      <SettingContainer
        draggable={true}
        id={this.props.order}
        onDragOver={(e) => e.preventDefault()}
        onDragStart={this.props.handleDrag}
        onDrop={this.props.handleDrop}
      >
        <div id={this.props.id}>{this.props.id}</div>
        <StyledRow>
          <StyledButton variant="primary" onClick={this.decre}>
            <i className="fas fa-angle-down fa-sm"></i>
          </StyledButton>
          <TimeFormat>{`${displayTimeMMSS(this.props.length)}`}</TimeFormat>
          <StyledButton variant="primary" onClick={this.incre}>
            <i className="fas fa-angle-up fa-sm"></i>
          </StyledButton>
        </StyledRow>
      </SettingContainer>
    );
  }
}
