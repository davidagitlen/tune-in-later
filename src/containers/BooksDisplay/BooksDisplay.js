import React from 'react';
import './BooksDisplay.css';
import { setCurrentUserFavorites, addUserFavorite } from '../../actions';
import apiCalls from '../../util/apiCalls';
import { connect } from 'react-redux';

const BooksDisplay = ({books, sectionGenre}) => {
  
  const handleFavorite = () => {
    console.log('before', this.props.currentUser )
    // addUserFavorite()
    // apiCalls.addFavoritesToApi(book, this.props.currentUser.id )
    console.log('after')
  }

  console.log('books in booksdisplay', books)
  const bookList = books.map(book => {
    const {artist, image, price, title, filterType} = book;
    return (
      <article key={title + price}>
        <div className="img">
          <img src={image} alt=''/>
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
  });

  return(
    <section className='BooksDisplay'>
      <div>
        <h2 className="genreLabel">{sectionGenre}</h2>
      </div>
      <div>
        {bookList}
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  currentUser : state.currentUser,
  favorites : state.favorites
})

const mapDispatchToProps = dispatch => ({
  setCurrentUserFavorites : favorites => dispatch(setCurrentUserFavorites(favorites)),
  // addUserFavorite : (favorite, id) => dispatch(addUserFavorite(favorite, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksDisplay);