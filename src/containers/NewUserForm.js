import React, { Component } from 'react';
import './NewUserForm.scss';

class NewUserForm extends Component {
  // constructor(props) {
  //   super (props),
  //   this.state = {
  //     email: '',
  //     password: ''
  //   }
  // }

  handleSubmitNewUser = (e) => {
    // e.preventDefault;
    //check if email exists?
    //set user to selecteduser
    //hide the login/new user sections
  }

  render() {
    return(
      <form class="NewUserForm">
        <h2>New here? Create an account below:</h2>
        <input 
          name="new-user-name"
          type="text"
          placeholder="Enter your name"
          ></input>
        <input 
          name="new-user-email" 
          type="text"
          placeholder="Enter your e-mail"></input>
        <input 
          name="new-user-password" 
          type="text"
          placeholder="Enter a password"
          ></input>
          <button type="submit">Create Account</button>
      </form>
    )
  }
}

export default NewUserForm;