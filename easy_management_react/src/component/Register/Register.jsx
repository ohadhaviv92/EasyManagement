import React, { Component } from 'react'
import SmartButton from '../SmartButton/SmartButton';

import './Register.css';
export default class Register extends Component {

  Async = () => {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, 1000);
    });
  }
  
  
  Action = res => this.props.history.replace('/app');

  _Login = () => this.props.history.push('/');
  render() {
    return (
      <div className="register">
      <div className="register__form">
        <div className="register__row">
          <input type="text" className="register__input name" placeholder="Username"/>
        </div>
        <div className="register__row">
          <input type="password" className="register__input pass" placeholder="Password"/>
        </div>
        <div className="register__row">
          <input type="text" className="register__input name" placeholder="First Name"/>
        </div>
        <div className="register__row">
          <input type="text" className="register__input name" placeholder="Last Name"/>
        </div>
        <div className="register__row">
          <input type="email" className="register__input name" placeholder="Email"/>
        </div>
        <div className="register__row">
          <input type="tel" className="register__input name" placeholder="Phone"/>
        </div>
        <SmartButton Async={this.Async} Action={this.Action}>Register</SmartButton>
        <p className="login__signup">Go back to &nbsp;<a onClick={this._Login}>Login</a></p>
      </div>
    </div>
    )
  }
}
