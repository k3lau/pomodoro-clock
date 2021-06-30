import styled from "styled-components";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

export const TimerSetting = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.size};
  padding: 20px;
`;

export const StyledButton = styled(Button)`
  box-sizing: border-box;
  width: ${(props) => (props.variant === "primary" && "2.5em") || (props.variant === "setting" && "1.75em") || "1.2em"};
  height: ${(props) => (props.variant === "primary" && "2.5em") || (props.variant === "setting" && "1.2em") || "1.2em"};
  border-radius: ${(props) => (props.variant === "setting" && "0.1rem") || "50%"};
  margin: ${(props) => (props.variant === "primary" && "0.2em 0.2em") || "0px 0px"};
  padding: 8px 0.5rem;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  color: #404040;
  border: ${(props) =>
    (props.variant === "primary" && "2px solid")
    || (props.variant === "setting" && "0px")
    || ("1px solid #404040")};

  &:focus,
  &:active:focus {
    outline: thin dotted;
    outline: 1px auto -webkit-focus-ring-color;
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
    border: 1px solid #ababab;
    padding: ${(props) =>
      (props.variant === "primary" && "4px 4px")
      || (props.variant === "setting" && "0px 0.5rem")
      || ("5px 5px")};
    margin: ${(props) =>
      (props.variant !== "primary" &&  "0px 0px")};
  }
`;

export const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 150px;
  padding: 0.2em;
  border-radius: 50%;
  box-shadow: 0.25rem 0.25rem 1.5rem rgba(0, 0, 0, 0.6);
`;

export const SettingContainer = styled.div`

  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em 0.5em 1em;
  margin: 0.5em 1em 0.5em 1em;
  background-color: transparent;
  border-radius: 0.5em;
  box-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.6);
`;

export const ButtonContainer = styled(Button)`
  width: auto;
  border: 0px;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.6);
  margin: 0em 0.5em;
  padding: 4px 4px;
  font-size: 1em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  color: #404040;

  * {
    padding: 0em 0.25em;
  }

  &:focus,
  &:active:focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
    border-color: #404040;
  }
  &:hover,
  &:focus {
    background-color: #404040;
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
    padding: 2px 4px;
  }
`;

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Layout = styled.div`
  width: 100%;
  max-width: 100vh;

  height: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-width: 480px;
  margin: auto;
  border-radius: 10px;
  padding: 10px;
  font-size: 1em;
`;

export const TimeFormat = styled.div`
  font-family: Roboto;
`;

export const Paragraph = styled.p`
  font-family: Noto Sans;
  font-weight: normal;
  text-align: center;
`;

export const SettingWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 100%;
  padding: 10px 10px;

`;

export const DisplayWrapper = styled.div`
  padding: 10px 10px 30px 10px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.4fr 0.5fr 0.4fr 1fr;
  width: 100%;
  align-items: stretch;
  justify-content: center;
  > * {
    justify-self: center;
    align-self: center;
  }
`;

export const StyledFormControl = styled(FormControl)`
  height: 1.6em;
  padding: 0px;
  margin: 0px;
  text-align: center;
  font: inherit;
`;