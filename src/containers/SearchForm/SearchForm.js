import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchForm.scss';
import magnifierTool from '../../images/magnifier-tool.svg';
import { fetchSearch } from '../../util/apiCalls';
import { displaySearchResults } from '../../actions/';
import PropTypes from 'prop-types';

export class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      results: []
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
    this.props.displaySearchResults([]);
    fetchSearch(this.state.searchTerm)
      .then(resp => {
        const results = this.cleanSearchResults(resp.results)
        this.props.displaySearchResults(results)
      }
      )
    this.clearSearch();
  }

  cleanSearchResults = (rawSearchResults) => {
    const allBooks = rawSearchResults.map(datum => datum).flat();
    let regex = new RegExp('(&nbsp;|<([^>]+)>)', 'g');
    const formattedBooks = allBooks.map(book => ({
      id: book.collectionId,
      date: book.releaseDate,
      artist: book.artistName,
      image: book.artworkUrl100,
      price: book.collectionPrice,
      title: book.collectionName,
      genre: book.primaryGenreName,
      description: book.description.replace(regex, ''),
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

const mapDispatchToProps = dispatch => ({
  displaySearchResults: (searchResults) => dispatch(displaySearchResults(searchResults))
})

export default connect(null, mapDispatchToProps)(SearchForm);

SearchForm.propTypes = {
  displaySearchResults: PropTypes.func.isRequired
}