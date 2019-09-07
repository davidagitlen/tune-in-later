import React from 'react';
import './BooksDisplay.css';

const BooksDisplay = ({books, sectionGenre}) => {
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
          <h5>{price}</h5>
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

export default BooksDisplay;