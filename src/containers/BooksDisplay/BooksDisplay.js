import React from 'react';
import Book from '../Book/Book';
import './BooksDisplay.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export const BooksDisplay = ({books, sectionGenre}) => {
  let booksToRender = books;  

  const handleFavoritesList = () => {
      let regex = new RegExp('(&nbsp;|<([^>]+)>)', 'g')
      const formattedFavorites = books.map(book => ({
        artist: book.author_name,
        image: book.artwork_url,
        title: book.book_name,
        genre: book.primary_genre_name,
        description: book.description.replace(regex, ''),
        date: book.release_date,
        id: book.book_id
      }));
     return formattedFavorites
  }

  if (sectionGenre === "Favorites") {
    booksToRender = handleFavoritesList();
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

export const mapStateToProps = state => ({
  currentUser : state.currentUser,
  favorites : state.favorites
})

export default connect(mapStateToProps)(BooksDisplay);

BooksDisplay.propTypes = {
  currentUser: PropTypes.object,
  favorites: PropTypes.array.isRequired
}