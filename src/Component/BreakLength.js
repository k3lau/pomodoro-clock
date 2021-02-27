import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class BreakLength extends Component {
  constructor(props) {
    super(props);
    this.decre = this.decre.bind(this);
    this.incre = this.incre.bind(this);
  }

  decre() {
    var time = this.props.breakLength;
    if (time >= 0) {
      this.props.setBreak(time - 1);
    }
  }

  incre() {
    var time = this.props.breakLength;
    this.props.setBreak(time + 1);
  }

  render() {
    return (
      <Container fluid="md">
        <Row>
          <div id="break-label">Break Length</div>
        </Row>
        <Row>
          <div id="break-length">{`${this.props.breakLength}`}</div>
        </Row>
        <Row>
          <Button variant="primary" id="break-decrement" onClick={this.decre}>
            -
          </Button>
          <Button variant="primary" id="break-increment" onClick={this.incre}>
            +
          </Button>
        </Row>
      </Container>
    );
  }
}
