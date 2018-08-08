import React, { Component } from 'react'
import SmartButton from '../SmartButton/SmartButton';
import SQL from '../../Handlers/SQL';
import './Register.css';
export default class Register extends Component {

  state = {
    userName: '',
    pass: '',
    firstName: '',
    lastName: '',
    email: '',
    tel: ''
  }

  Async = () => {
    return SQL.Register(
      this.state.userName,
      this.state.pass,
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.tel);
  }


  Action = res => this.props.history.replace('/app');

  _Login = () => this.props.history.push('/');
  render() {
    return (
      <div className="register">
        <div className="register__form">
          <div className="register__row">
            <input type="text" onChange={(e)=>this.setState({userName: e.target.value})} className="register__input name" placeholder="Username" />
          </div>
          <div className="register__row">
            <input type="password" onChange={(e)=>this.setState({pass: e.target.value})} className="register__input pass" placeholder="Password" />
          </div>
          <div className="register__row">
            <input type="text" onChange={(e)=>this.setState({firstName: e.target.value})} className="register__input name" placeholder="First Name" />
          </div>
          <div className="register__row">
            <input type="text" onChange={(e)=>this.setState({lastName: e.target.value})} className="register__input name" placeholder="Last Name" />
          </div>
          <div className="register__row">
            <input type="email" onChange={(e)=>this.setState({email: e.target.value})} className="register__input name" placeholder="Email" />
          </div>
          <div className="register__row">
            <input type="tel" onChange={(e)=>this.setState({tel: e.target.value})} className="register__input name" placeholder="Phone" />
          </div>
          <SmartButton Async={this.Async} Action={this.Action}>Register</SmartButton>
          <p className="login__signup">Go back to &nbsp;<a onClick={this._Login}>Login</a></p>
        </div>
      </div>
    )
  }
}
