import React, { Component } from "react";
import {
  SettingContainer,
  StyledButton,
  StyledRow,
  StyledCol,
  StyledFormControl,
  TimeFormat,
  GridContainer,
  StyledInputMask
} from "./TimerSetting.elements.js";
import { displayTimeMMSS, getSecondsFromHHMMSS, secondsToHHMMSS } from "../Util/TimeFormat";
import { Fragment } from "react";
import InputMask from 'react-input-mask';

export class TimerControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      time: "00:00",
    };
    this.decre = this.decre.bind(this);
    this.incre = this.incre.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.isCurrent = this.isCurrent.bind(this);
  }

  isCurrent() {
    if (this.props.item.order === this.props.timerType) {
      return true;
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleTimeChange(e) {
    this.setState({ time: e.target.value });
  }

  handleEdit(e) {
    this.props.setEdit(this.props.item);
    this.setState({
      name: this.props.item.name,
      time: secondsToHHMMSS(this.props.item.length),
    });
  }

  saveItem() {
    let newItem = { ...this.props.item };
    newItem.name = this.state.name;
    newItem.length = getSecondsFromHHMMSS(this.state.time);
    newItem.edit = false;
    this.props.setTimerItem(newItem);
    this.props.setTimerType(1);
    console.log(this.props.timerList[0].length)
    if (this.props.item.id === this.props.timerList[0].id) {
      this.props.setTimeLeft(newItem.length);
    } else {
    this.props.setTimeLeft(this.props.timerList[0].length);
    }
    this.props.setTimerStatus(0);
    return newItem;
  }

  decre() {
    var time = this.props.item.length - 60;
    if (time >= 10) {
      this.props.setLength(this.props.item.id, time);
      if (this.isCurrent()) {
        this.props.setTimeLeft(this.props.timeLeft - 60);
      }
    }
  }

  incre() {
    var time = this.props.item.length + 60;
    if (time <= 3600) {
      this.props.setLength(this.props.item.id, time);
      if (this.isCurrent()) {
        this.props.setTimeLeft(this.props.timeLeft + 60);
      }
    }
  }

  render() {
    return (
      <SettingContainer
        bgColor={() => (this.isCurrent() ? "#DF7373" : "transparent")}
      >
        {!this.props.item.edit ? (
          <GridContainer>
            <div>{this.props.item.name}</div>
            <StyledButton variant="small" onClick={this.decre}>
              <i className="fas fa-angle-down fa-sm"></i>
            </StyledButton>
            <TimeFormat>
              {`${displayTimeMMSS(this.props.item.length)}`}{" "}
            </TimeFormat>
            <StyledButton variant="small" onClick={this.incre}>
              <i className="fas fa-angle-up fa-sm"></i>
            </StyledButton>

            <StyledButton variant="setting" onClick={this.handleEdit}>
              <i className="fas fa-edit fa-sx"></i>
            </StyledButton>
          </GridContainer>
        ) : (
          <GridContainer layout="edit">
            <StyledFormControl
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <StyledButton variant="small" onClick={this.decre}>
              <i className="fas fa-angle-down fa-sm"></i>
            </StyledButton>
            <StyledInputMask
              type="text"
              value={this.state.time}
              onChange={this.handleTimeChange}
              mask="99:99"
            />
            <StyledButton variant="small" onClick={this.incre}>
              <i className="fas fa-angle-up fa-sm"></i>
            </StyledButton>
            <StyledRow>
              <StyledButton variant="setting" onClick={this.saveItem}>
                <i className="far fa-save fa-sx"></i>
              </StyledButton>
              <StyledButton variant="setting" onClick={this.saveItem}>
                <i className="fas fa-trash fa-sx"></i>
              </StyledButton>
              <StyledButton variant="setting" onClick={this.handleEdit}>
                <i className="fas fa-times fa-sx"></i>
              </StyledButton>
            </StyledRow>
          </GridContainer>
        )}
      </SettingContainer>
    );
  }
}
