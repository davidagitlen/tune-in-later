import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUserFavorite, setCurrentUserFavorites, setSelectedBook, deleteUserFavorite } from '../actions';
import { addFavoriteToApi, deleteFavoriteFromApi } from '../util/apiCalls';
import { Redirect } from 'react-router-dom';

class Book extends Component {

  state={
    buttonWasClicked: false
  }


  handleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!this.props.favorites.find(obj => obj.book_id === this.props.book.id)) {
      addFavoriteToApi(this.props.book, this.props.currentUser.id)
        .then(response => response.json())
        .then(data => this.props.addUserFavorite(data, this.props.currentUser.id))
        .then(data => console.log('added book', data))
        .catch(error => console.error(error));
    } else {
      deleteFavoriteFromApi(this.props.book, this.props.currentUser.id)
        .then(resp => {
          if(!resp.ok) {
          throw Error('There was an error deleting the favorite')
        }
          this.props.deleteUserFavorite(this.props.book)
        })
        .catch(error => console.error(error.message));
    } 
  }

  handleButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({buttonWasClicked: true});
    if (this.props.currentUser) {
      this.handleFavorite(e)
      this.setState({buttonWasClicked: false})
    }
  }

  
  render() {
    const bookElement = <article onClick={() => this.props.setSelectedBook(this.props.book)}>
    <div className="img">
      <img src={this.props.book.image} alt='' />
    </div>
    <div className="bookInfo">
      <h2>{this.props.book.title}</h2>
      <h3>{this.props.book.artist}</h3>
      <h4>{this.props.book.filterType}</h4>
      <h5>${this.props.book.price}</h5>
      <button onClick={this.handleButtonClick}>Favorite</button>
    </div>
  </article>;




    if (!this.props.currentUser && this.state.buttonWasClicked) {
      console.log(this.props.currentUser, this.state)
      window.scrollTo(0,0);
      return (
        <>
          {bookElement}
          <Redirect to='/login' />
        </>
      )
    }
    return(
      <>
      {bookElement}
      </>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  favorites: state.favorites
})

const mapDispatchToProps = dispatch => ({
  setSelectedBook: book => dispatch(setSelectedBook(book)),
  setCurrentUserFavorites: favorites => dispatch(setCurrentUserFavorites(favorites)),
  addUserFavorite: (favorite, id) => dispatch(addUserFavorite(favorite, id)),
  deleteUserFavorite: (favorite) => dispatch(deleteUserFavorite(favorite))
})

export default connect(mapStateToProps, mapDispatchToProps)(Book);
