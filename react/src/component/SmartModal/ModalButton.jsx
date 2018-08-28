import React, { Component } from "react";

import "./ModalButton.css";

export default class ModalButton extends Component {


    state = {
        activeClass: 'closed'
    }

    _Toggle = () => {
        this.setState((pervState)=>{
            return {activeClass: pervState.activeClass === 'closed' ? 'opened' : 'closed'}
        },()=>this.props.Toggle(this.state.activeClass))
        
    }

  render() {
    return (
      <div className={`circle-plus ${this.state.activeClass}`} onClick={this._Toggle}>
        <div className="circle">
          <div className="horizontal" />
          <div className="vertical" />
        </div>
      </div>
    );
  }
}
