import React, { Component } from 'react'
import SmartButton from '../SmartButton/SmartButton';

import './Login.css';

export default class Login extends Component {

Async = () => {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, 1000);
  });
}


Action = res => this.props.history.replace('/app');
_Register = () => this.props.history.push('/register');

  render() {
    return (
        <div className="login">
            <div className="login__form">
              <div className="login__row">
                <svg className="login__icon name svg-icon" viewBox="0 0 20 20">
                  <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                </svg>
                <input type="text" className="login__input name" placeholder="Username"/>
              </div>
              <div className="login__row">
                <svg className="login__icon pass svg-icon" viewBox="0 0 20 20">
                  <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                </svg>
                <input type="password" className="login__input pass" placeholder="Password"/>
              </div>
              <SmartButton Async={this.Async} Action={this.Action}>Login</SmartButton>
              <p className="login__signup">Don't have an account?. &nbsp;<a onClick={this._Register}>Register</a></p>
            </div>
          </div>
    )
  }
}
