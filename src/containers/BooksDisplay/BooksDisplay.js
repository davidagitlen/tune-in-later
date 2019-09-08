import React from 'react';
import Book from '../../Book/Book';
import './BooksDisplay.css';
import { setCurrentUserFavorites} from '../../actions';
import { connect } from 'react-redux';

const BooksDisplay = ({books, sectionGenre}) => {
  const bookList = books.map(book => 
    <Book book={book} key={book.title + book.price}/>
  );

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