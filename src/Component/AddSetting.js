import React, { useState } from "react";
import {
  SettingWrapper,
  ButtonContainer,
  StyledButton,
  StyledRow,
} from "./TimerSetting.elements.js";

const AddSetting = (props) => {
  return (
    <ButtonContainer onClick={props.setAddStatus}>
      <i className="fas fa-plus fa-sm"></i>
      <div>Add a setting</div>
    </ButtonContainer>

  );
};

export default AddSetting;
