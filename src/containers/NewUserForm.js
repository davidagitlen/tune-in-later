import React, { Component } from 'react';
import './NewUserForm.scss';

class NewUserForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  }

  addNewUserFetch = () => {

    const body = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    fetch('http://localhost:3001/api/v1/users', options)
      .then(resp => {
        if (!resp.ok) {
          throw Error('Something went wrong')
        }
        return resp.json()
      })
      .then(data => console.log(data))
      .catch(err => this.setState({
        name: '',
        email: '',
        password: '',
        error: err}))
  }


  handleNewUserInputs = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  handleSubmitNewUser = (e) => {
    e.preventDefault();
    this.addNewUserFetch();
    //set user to selecteduser
    //hide the login/new user sections
  }

  render() {
    return(
      <form class="NewUserForm">
        <h2>New here? Create an account below:</h2>
        <input 
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleNewUserInputs}
          placeholder="Enter your name"
          ></input>
        <input 
          name="email" 
          type="text"
          value={this.state.email}
          onChange={this.handleNewUserInputs}
          placeholder="Enter your e-mail"></input>
        <input 
          name="password" 
          type="text"
          value={this.state.password}
          placeholder="Enter a password"
          onChange={this.handleNewUserInputs}
          ></input>
          {this.state.error && <p>Sorry, that e-mail is already associated with an account.</p>}
          <button type="submit" onClick={this.handleSubmitNewUser}>Create Account</button>
      </form>
    )
  }
}

export default NewUserForm;