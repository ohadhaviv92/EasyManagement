
import React, { Component } from 'react'
import './SmartButton.css';


export default class SmartButton extends Component {

  state = { activeClass: 'login__submit', animating: false }
  onLogin = async (e) => {
    if (this.state.animating) return;

    this.setState({ activeClass: "login__submit processing", animating: true });

    try {
      const result = await this.props.Async();
      this.setState({ activeClass: "login__submit processing success" });
      setTimeout(() => {
        this.setState({ activeClass: "login__submit", animating: false });
        this.props.Action(result);
      }, 500);
    } catch (error) {
      console.log(error);
      this.setState({ activeClass: "login__submit", animating: false });

    }


  }


  render() {
    return (
      <div>
        <button type="button" className={this.state.activeClass} onClick={this.onLogin}>{this.props.children}</button>
      </div>
    )
  }
}
