import styled from "styled-components";
import Button from "react-bootstrap/Button";

export const TimerSetting = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: lightblue;
  width: 50%;
  padding: 0px;
`;

const size = "2.5";
export const StyledButton = styled(Button)`
  width: ${size}em;
  height: ${size}em;
  border-radius: ${size / 2}em;
  display: inline-block;
  text-align: center;

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
