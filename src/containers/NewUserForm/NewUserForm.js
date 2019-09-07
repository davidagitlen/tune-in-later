import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NewUserForm.scss';
import { setCurrentUser } from '../actions/index'

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
          throw Error('Something went wrong');
        }
        return resp.json()
      })
      .then(data => console.log(data))
      .catch(err => 
        this.setState({
        name: '',
        email: '',
        password: '',
        error: err.message})
        )
  }


  handleNewUserInputs = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  clearNewUserInputs = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
      error: ''
    })
  }

  handleSubmitNewUser = (e) => {
    e.preventDefault();
    this.addNewUserFetch();
    this.props.setCurrentUser({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    });
    this.clearNewUserInputs();
    //hide the login/new user sections
  }

  render() {
    return(
      <form className="NewUserForm">
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

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(NewUserForm);