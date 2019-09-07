import React from 'react';
import './BooksDisplay.css';
import { setCurrentUserFavorites } from '../../actions';
import { connect } from 'react-redux';

const BooksDisplay = ({books, sectionGenre}) => {
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
          <button>Favorite</button>
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
  setCurrentUserFavorites : favorites => dispatch(setCurrentUserFavorites(favorites))
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksDisplay);