import React from 'react';
import { connect } from 'react-redux';
import { addUserFavorite, setCurrentUserFavorites, setSelectedBook, deleteUserFavorite } from '../actions';
import { addFavoriteToApi, deleteFavoriteFromApi } from '../util/apiCalls';
import './Book.scss';


const Book = (props) => {
  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!props.favorites.find(obj => obj.book_id === props.book.id)) {
      addFavoriteToApi(props.book, props.currentUser.id)
        .then(response => response.json())
        .then(data => props.addUserFavorite(data, props.currentUser.id))
        .then(data => console.log('added book', data))
        .catch(error => console.error(error));
    } else {
      deleteFavoriteFromApi(props.book, props.currentUser.id)
        .then(resp => {
          if(!resp.ok) {
          throw Error('There was an error deleting the favorite')
        }
          props.deleteUserFavorite(props.book)
        })
        .catch(error => console.error(error.message));
    } 
  }


  const { title, artist, filterType, price, image } = props.book;
  const isFavorite = props.favorites.find(obj => obj.book_id === props.book.id);
  const favoriteClass = isFavorite ? 'Book favorited' : 'Book'; 
  return(
    <article onClick={() => props.setSelectedBook(props.book)} className={favoriteClass}>
      <div className="img">
        <img src={image} alt='' />
      </div>
      <div className="bookInfo">
        <h2>{title}</h2>
        <h3>{artist}</h3>
        <h4>{filterType}</h4>
        <h5>${price}</h5>
        <button onClick={handleFavorite}>Favorite</button>
      </div>
    </article>
  )
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
