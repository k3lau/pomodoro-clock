import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class SessionLength extends Component {
  constructor(props) {
    super(props);
    this.decre = this.decre.bind(this);
    this.incre = this.incre.bind(this);
  }

  decre() {
    var time = this.props.sessionLength - 1;
    if (time >= 1) {
      this.props.setSession(time);
      if (this.props.timerType == "Session") {
        this.props.setTimeLeft(this.props.timeLeft - 60)
      }
    }
  }

  incre() {
    var time = this.props.sessionLength + 1;
    if (time <= 60) {
      this.props.setSession(time);
      if (this.props.timerType == "Session") {
        this.props.setTimeLeft(this.props.timeLeft + 60)
      }
      
    }
  }

  render() {
    return (
      <Container fluid="md">
        <Row>
          <div id="session-label">Session Length</div>
        </Row>
        <Row>
          <div id="session-length">{`${this.props.sessionLength}`}</div>
        </Row>
        <Row>
          <Button variant="primary" id="session-decrement" onClick={this.decre}>
            -
          </Button>
          <Button variant="primary" id="session-increment" onClick={this.incre}>
            +
          </Button>
        </Row>
      </Container>
    );
  }
}
