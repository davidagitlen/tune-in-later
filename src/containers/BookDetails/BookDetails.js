import React from 'react';
import './BookDetails.scss';

const BookDetails = ({book}) => {
  
  const {title, artist, genre, description, image} = book
  return(
    <div className="BookDetails">
      <img src={image} alt={title}></img>
      <div className="bookInfo">
        <h2>{title}</h2>
        <h3>{artist}</h3>
        <h4>{genre} </h4>
      </div>
      <div className="description">
      <p>{description}</p>
      </div>
    </div>
  )
}

export default BookDetails;