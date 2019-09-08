import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSelectedBook } from '../actions';


const Book = (props) => {
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
        <button>Favorite</button>
      </div>
    </article>
  )
}

const mapDispatchToProps = dispatch => ({
  setSelectedBook: book => dispatch(setSelectedBook(book))
})

export default connect(null, mapDispatchToProps)(Book);