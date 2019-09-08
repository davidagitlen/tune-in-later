import React from 'react';


const Book = ({book}) => {
  const { title, artist, filterType, price, image } = book;
  return(
    <article>
      <div className="img">
        <img src={image} alt='' />
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
}

export default Book;