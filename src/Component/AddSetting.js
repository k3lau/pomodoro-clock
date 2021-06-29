import React, { useState } from "react";
import {
  SettingWrapper,
  ButtonContainer,
  StyledButton,
  StyledRow,
} from "./TimerSetting.elements.js";

const AddSetting = (props) => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (e === "") {
      return;
    }
    
  };

  return (
    <ButtonContainer onClick={props.setAddStatus}>
      <i className="fas fa-plus fa-sm"></i>
      <div>Add a setting</div>
    </ButtonContainer>

  );
};

export default AddSetting;
