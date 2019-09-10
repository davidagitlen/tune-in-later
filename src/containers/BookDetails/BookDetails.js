import React from 'react';
import './BookDetails.scss';

const BookDetails = ({book}) => {
  
  const {title, author, genre, price, description, image} = book
  
  return(
  
    <div className="BookDetails">
      <img src={image} alt={title}></img>
      <div className="bookInfo">
        <h2>{title}</h2>
        <h3>{author}</h3>
        <p>{genre} </p>
        <p>${price}</p>
      </div>
      <div className="description">
      <p>{description}</p>
      </div>
    </div>
  )
}

export default BookDetails;