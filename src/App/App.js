import React, { Component } from 'react';
import LoginForm from '../components/Forms/LoginForm/LoginForm';
import BooksDisplay from '../BooksDisplay/BooksDisplay';
import { landingFetch, authorFetch } from '../util/apiCalls';
import './App.css';

class App extends Component{
  constructor() {
    super();
    this.state = {
      allBooks : [],
      authorWorks: []
    }
  }
  
  componentDidMount() {
    landingFetch()
      .then(data => this.setState({allBooks: this.handleInitialData(data)}))
      .catch(err => console.log(err, 'error in componentDidMount from landingFetch'))

    authorFetch('lois', 'lowry') 
      .then(data => this.setState({
        authorWorks : data.results.map(datum => ({
          artist: datum.artistName,
          image: datum.artworkUrl100,
          price: datum.collectionPrice,
          title: datum.collectionName,
          genre: datum.primaryGenreName,
          description: datum.description
            }
        )
    )}))
      .catch(err => console.log(err, 'error in componentDidMount from authorFetch'))
  }

  handleInitialData = (data) => {
    const allBooks = data.map(datum => datum).flat();
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

  filterAllBooks = (filterType) => {
    const filteredBooks = this.state.allBooks.filter(book => book.filterType === filterType);
    return filteredBooks;
  }

  render() { 
    return (
    <div className="App">
      <header>
        <h1>FETCH ATTEMPTS!</h1>
      </header>
      <LoginForm />
      {this.state.allBooks.length && <BooksDisplay 
        books={this.filterAllBooks('romance')} 
        sectionGenre='Romances'/>}
      {this.state.allBooks.length && <BooksDisplay 
        books={this.filterAllBooks('fantasy')} 
        sectionGenre='Fantasies'/>}
      {this.state.allBooks.length && <BooksDisplay 
        books={this.filterAllBooks('biography')}
        sectionGenre='Biographies' />}
      {this.state.allBooks.length && <BooksDisplay 
        books={this.filterAllBooks('history')} 
        sectionGenre='Histories'/>}
      {this.state.allBooks.length && <BooksDisplay 
        books={this.filterAllBooks('horror')} 
        sectionGenre='Horrors'/>} */}
    </div>
    )
  }
}

export default App;
