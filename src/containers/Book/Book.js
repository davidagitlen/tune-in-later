import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUserFavorite, setSelectedBook, deleteUserFavorite } from '../../actions';
import { addFavoriteToApi, deleteFavoriteFromApi } from '../../util/apiCalls';
import star from '../../images/star.svg';
import activeStar from '../../images/active-star.svg';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Book.scss';

export class Book extends Component {

  state={
    buttonWasClicked: false
  }

  handleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!this.props.favorites.find(obj => obj.book_id === this.props.book.id)) {
      addFavoriteToApi(this.props.book, this.props.currentUser.id)
        .then(resp => {
          if (!resp.ok) {
            throw Error('There was an error adding the favorite')
          }
          return resp.json()})
        .then(data => this.props.addUserFavorite(data, this.props.currentUser.id))
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
    const { title, artist, image } = this.props.book;
    const isFavorite = this.props.favorites.find(obj => obj.book_id === this.props.book.id);
    const favoriteClass = isFavorite ? 'Book favorited' : 'Book'; 
    const favoriteStar = isFavorite ? activeStar : star;
    const bookElement = 
    <article className={favoriteClass} onClick={() => this.props.setSelectedBook(this.props.book)}>
      <div className="img">
        <img src={image} alt='' />
      </div>
      <div className="bookInfo">
        <h2>{title}</h2>
        <h3>{artist}</h3>
      </div>
      <button onClick={this.handleButtonClick}>
        <img src={favoriteStar} alt=''/>
        Favorite
      </button>
    </article>;

    if (!this.props.currentUser && this.state.buttonWasClicked) {
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

export const mapStateToProps = state => ({
  currentUser: state.currentUser,
  favorites: state.favorites
})

export const mapDispatchToProps = dispatch => ({
  setSelectedBook: book => dispatch(setSelectedBook(book)),
  addUserFavorite: (favorite, id) => dispatch(addUserFavorite(favorite, id)),
  deleteUserFavorite: (favorite) => dispatch(deleteUserFavorite(favorite))
})

export default connect(mapStateToProps, mapDispatchToProps)(Book);

Book.propTypes = {
  book: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  favorites: PropTypes.array.isRequired,
  setSelectedBook: PropTypes.func.isRequired,
  addUserFavorite: PropTypes.func.isRequired,
  deleteUserFavorite: PropTypes.func.isRequired,
}
