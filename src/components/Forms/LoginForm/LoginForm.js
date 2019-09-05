import React, { Component } from 'react';
import './LoginForm.scss';

class LoginForm extends Component {
  render() {
    return (
      <form className="login-form">
        <input className="email-input" placeholder="joanclarke@fempower.com" alt="email" name="email"></input>
        <input className="password-input" placeholder="type password here..." alt="password" name="password"></input>
        <button className="login-btn">Login</button>
      </form>
    )
  }
} 

export default LoginForm;