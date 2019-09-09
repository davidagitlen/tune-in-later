import React from 'react';
import Book from '../../Book/Book';
import './BooksDisplay.scss';
import { setCurrentUserFavorites } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const BooksDisplay = ({books, sectionGenre}) => {
  let booksToRender = books;  

  const handleFavoritesList = () => {
      const formattedFavorites = books.map(book => ({
        artist: book.author_name,
        image: book.artwork_url,
        title: book.book_name,
        genre: book.primary_genre_name,
        description: book.description,
        date: book.release_date,
        id: book.book_id
      }));
     return formattedFavorites
  }

  if (sectionGenre === "Favorites") {
    booksToRender = handleFavoritesList();
    console.log(booksToRender, 'books to render')
  } 

  let bookList = booksToRender.map(book => 
    <Book book={book} key={book.id*Date.now()}/>
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
  setCurrentUserFavorites : favorites => dispatch(setCurrentUserFavorites(favorites))
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksDisplay);

BooksDisplay.propTypes = {
  currentUser: PropTypes.object,
  favorites: PropTypes.array.isRequired,
  setCurrentUserFavorites: PropTypes.func.isRequired
}