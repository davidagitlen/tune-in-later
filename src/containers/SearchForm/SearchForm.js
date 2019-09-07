import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchForm.scss';
import magnifierTool from '../images/magnifier-tool.svg';
import { fetchSearch } from '../../util/apiCalls';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ''
    }
  }


  handleSearchInput = (e) => {
    this.setState({ searchTerm: e.target.value})
  }


  clearSearch = () => {
    this.setState({ searchTerm: '' })
  }

  handleSearch = (e) => {
    e.preventDefault();
    fetchSearch(this.state.searchTerm)
      .then(resp => {
        console.log(resp)
        console.log(this.cleanSearchResults(resp.results))
      }
      )
    this.clearSearch();
  }

  cleanSearchResults = (rawSearchResults) => {
    const allBooks = rawSearchResults.map(datum => datum).flat();
    const formattedBooks = allBooks.map(book => ({
      artist: book.artistName,
      image: book.artworkUrl100,
      price: book.collectionPrice,
      title: book.collectionName,
      genre: book.primaryGenreName,
      description: book.description,
      filterType: book.filterType
    }));
    return formattedBooks
  }

  render() {


    return(
      <div className="SearchForm">
        <form>
          <input
            type="text"
            value={this.state.searchTerm}
            placeholder="Search"
            onChange={this.handleSearchInput}
            ></input>
          <input 
            type="image" 
            src={magnifierTool}
            alt="search"
            onClick={this.handleSearch}
            ></input>
        </form>
      </div>
    )
  }
}


export default SearchForm;