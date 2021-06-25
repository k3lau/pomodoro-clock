import React, { Component } from "react";
import {
  SettingContainer,
  StyledButton,
  StyledRow,
  TimeFormat,
} from "./TimerSetting.elements.js";
import { displayTimeMMSS } from "../Util/TimeFormat";
import { Fragment } from "react";

export class TimerControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      name: this.props.item.name,
    };
    this.decre = this.decre.bind(this);
    this.incre = this.incre.bind(this);
    this.setEdit = this.setEdit.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  saveItem() {
    let newItem = { ...this.props.item };
    newItem.name = this.state.name;
    this.props.setTimerItem(newItem);
    this.setEdit();
    return newItem;
  }

  setEdit() {
    this.setState((state) => ({
      edit: !state.edit,
    }));
  }

  decre() {
    var time = this.props.item.length - 60;
    if (time >= 10) {
      this.props.setLength(this.props.item.id, time);
      if (this.props.timerType === this.props.item.order) {
        this.props.setTimeLeft(this.props.timeLeft - 60);
      }
    }
  }

  incre() {
    var time = this.props.item.length + 60;
    if (time <= 3600) {
      this.props.setLength(this.props.item.id, time);
      if (this.props.timerType === this.props.item.order) {
        this.props.setTimeLeft(this.props.timeLeft + 60);
      }
    }
  }

  render() {
    return (
      <Fragment>
        {!this.state.edit ? (
          <SettingContainer>
            <StyledRow>
              <div id={this.state.name}>{this.state.name}</div>
              <StyledRow>
                <StyledButton variant="small" onClick={this.decre}>
                  <i className="fas fa-angle-down fa-sm"></i>
                </StyledButton>
                <TimeFormat>
                  {`${displayTimeMMSS(this.props.item.length)}`}{" "}
                </TimeFormat>
                <StyledButton variant="small" onClick={this.incre}>
                  <i className="fas fa-angle-up fa-sm"></i>
                </StyledButton>
              </StyledRow>
              <button onClick={this.setEdit}>Edit</button>
            </StyledRow>
          </SettingContainer>
        ) : (
          <SettingContainer>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
              name="todo"
            />
            <button onClick={this.setEdit}>Cancel</button>
            <button type="submit" onClick={this.saveItem}>
              Save
            </button>
          </SettingContainer>
        )}
      </Fragment>
    );
  }
}
