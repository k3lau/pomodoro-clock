import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

export const TimerSetting = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: lightblue;
  width: 200px;
  padding: 20px;
`;

const size = "1";
export const StyledButton = styled(Button)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 2px;
  padding: 0;
  border: 0;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  color: #404040;
  border: 2px solid #404040;

  &:focus,
  &:active:focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
  &:hover,
  &:focus {
    color: #404040;
    text-decoration: none;
  }
  &:active {
    background-image: none;
    outline: 0;
    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
  &:focus,
  &:hover,
  &:active {
    background-color: #dfdfdf;
    border: 2px solid #ababab;
  }
`;

export const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: lightblue;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  padding: 0.2em;
  border-radius: 50%;
  box-shadow: 0.25rem 0.25rem 1.5rem rgba(0, 0, 0, 0.6);
`;

export const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: lightgrey;
  padding: 0.5em 2em 0.5em 2em;
  border-radius: 10%;
`;

export const StyledRow = Row;
