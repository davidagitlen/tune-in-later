import React, { Component } from 'react';
import { loginUser } from '../../util/apiCalls';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions';
import './LoginForm.scss';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    } 
  }

  handleInputs = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  checkLoginStatus = (e) => {
    e.preventDefault();
    loginUser(this.state.email, this.state.password)
      .then(response => {
        if(!response.ok){
          throw Error('Can\'t get user')
        }
        return response.json()
      })
      .then(data => this.props.setCurrentUser(data))
      .catch(error => 
        this.setState({
          email: '',
          password: '',
          error: error.message
        })
      );
      this.clearLoginInputs();
  }

  clearLoginInputs = () => {
    this.setState({
      email: '',
      password: '',
      error: ''
    })
  }

  render() {
    console.log(this.props.favorites)
    return (
      <form className="login-form">
        {this.props.currentUser ? <h2>Welcome {this.props.currentUser.name}!</h2> : <h2>Welcome, please login.</h2>}
        <input className="email-input" placeholder="joanclarke@fempower.com" alt="email" name="email" value={this.state.email} onChange={this.handleInputs}></input>
        <input className="password-input" placeholder="type password here..." alt="password" name="password" value={this.state.password} onChange={e => this.handleInputs(e)}></input>
        {this.state.error && <p>Incorrect email or password.</p>}
        <button className="login-btn" onClick={this.checkLoginStatus}>Login</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  favorites: state.favorites
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);