import React, { Component } from "react";
import ModalButton from "./ModalButton";

import "./Modal.css";
export default class Modal extends Component {
  state = {
    activeClass: "closed"
  };

  Toggle = (active) => {
      this.setState({activeClass: active});
  };
  render() {
    return (
      <div>
        <ModalButton Toggle={this.Toggle} />
        <div className={`modal ${this.state.activeClass}`}>{this.props.children}</div>
      </div>
    );
  }
}
