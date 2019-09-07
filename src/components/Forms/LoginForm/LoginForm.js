import React, { Component } from 'react';
import { loginUser } from '../../../util/apiCalls';
import './LoginForm.scss';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    } 
  }

  handleInputs = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  checkLoginStatus = (e) => {
    e.preventDefault();
    loginUser(this.state.email, this.state.password)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  render() {
    // loginUser(this.state.email, this.state.password);
    
    return (
      <form className="login-form">
        <input className="email-input" placeholder="joanclarke@fempower.com" alt="email" name="email" value={this.state.email} onChange={this.handleInputs}></input>
        <input className="password-input" placeholder="type password here..." alt="password" name="password" value={this.state.password} onChange={e => this.handleInputs(e)}></input>
        <button className="login-btn" onClick={this.checkLoginStatus}>Login</button>
      </form>
    )
  }
} 

export default LoginForm;