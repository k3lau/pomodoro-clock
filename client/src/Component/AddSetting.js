import React from "react";
import {
  ButtonContainer,
} from "./TimerSetting.elements.js";

const AddSetting = (props) => {
  return (
    <ButtonContainer onClick={props.handleOnclick}>
      <i className={props.icon}></i>
      <div>{props.label}</div>
    </ButtonContainer>

  );
};

export default AddSetting;
