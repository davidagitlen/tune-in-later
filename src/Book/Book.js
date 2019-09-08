import React from 'react';
import { connect } from 'react-redux';
import { addUserFavorite, setCurrentUserFavorites, setSelectedBook } from '../actions';
import { addFavoritesToApi } from '../util/apiCalls';


const Book = (props) => {
  const { book, currentUser } = props;
  console.log('in book container checking props', book, currentUser);
  const handleFavorite = () => { 
    props.addUserFavorite(book, currentUser.id)
    addFavoritesToApi(book, currentUser.id )
      .then(response => response.json())
      .then(data => console.log('book', data))
      .catch(error => console.error(error));
  }

  const { title, artist, filterType, price, image } = props.book;
  return(
    <article onClick={() => props.setSelectedBook(props.book)}>
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
  addUserFavorite: (favorite, id) => dispatch(addUserFavorite(favorite, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Book);
