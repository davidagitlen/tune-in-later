import React, { Component } from 'react';
import { loginUser, getUserFavoritesFromApi } from '../../util/apiCalls';
import { connect } from 'react-redux';
import { setCurrentUser, setCurrentUserFavorites } from '../../actions';
import PropTypes from 'prop-types';
import './LoginForm.scss';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    } 
  }

  handleInputs = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleGetUserFavorites = (user) => {
    getUserFavoritesFromApi(user.id)
      .then(data => this.props.setCurrentUserFavorites(data.favorites))
  }

  checkLoginStatus = (e) => {
    e.preventDefault();
    loginUser(this.state.email, this.state.password)
      .then(data => {
        this.props.setCurrentUser(data)
        this.handleGetUserFavorites(data)
      })
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
    // console.log(this.state.currentUser)
    return (
      <form className="login-form">
        <input className="email-input" placeholder="joanclarke@fempower.com" alt="email" name="email" value={this.state.email} onChange={this.handleInputs}></input>
        <input className="password-input" type="password" placeholder="type password here..." alt="password" name="password" value={this.state.password} onChange={e => this.handleInputs(e)}></input>
        {this.state.error && <p>Email and Password do not match.</p>}
        <button className="login-btn" onClick={this.checkLoginStatus}>Login</button>
      </form>
    )
  }
}

export const mapStateToProps = state => ({
  currentUser: state.currentUser,
  favorites: state.favorites
})

export const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setCurrentUserFavorites: favorites => dispatch(setCurrentUserFavorites(favorites))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  currentUser: PropTypes.object,
  favorites: PropTypes.array.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setCurrentUserFavorites: PropTypes.func.isRequired
}