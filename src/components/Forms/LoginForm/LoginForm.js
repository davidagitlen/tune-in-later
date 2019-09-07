import React, { Component } from 'react';
import './LoginForm.scss';

class LoginForm extends Component {

  createNewUser = (e) => {
    e.preventDefault(e);
    const bodyInfo = {
      name: 'Divad',
      email: 'Divad@gmail.com',
      password: 'divadspassword'
    }
    const options = {
      method: "POST",
      body: JSON.stringify(bodyInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch("http://localhost:3001/api/v1/users", options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  loginExistingUser = (e) => {
    e.preventDefault();
    const bodyInfo = {
      email: 'test@turing.io',
      password: 'TESTpassword'
    }

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyInfo)
    }

    fetch("http://localhost:3001/api/v1/login", options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }


  render() {
    return (
      <form className="login-form">
        <input className="email-input" placeholder="joanclarke@fempower.com" alt="email" name="email"></input>
        <input className="password-input" placeholder="type password here..." alt="password" name="password"></input>
        <button onClick={(e) => this.loginExistingUser(e)}className="login-btn">Login</button>
      </form>
    )
  }
} 

export default LoginForm;