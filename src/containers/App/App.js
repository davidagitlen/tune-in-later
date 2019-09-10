import React, { Component } from 'react';
import BooksDisplay from '../BooksDisplay/BooksDisplay';
import LoginForm from '../LoginForm/LoginForm';
import { landingFetch } from '../../util/apiCalls';
import './App.scss';
import NewUserForm from '../NewUserForm/NewUserForm';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions';
import SearchForm from '../SearchForm/SearchForm';
import BookDetails from '../BookDetails/BookDetails';
import PropTypes from 'prop-types';

export class App extends Component{
  constructor() {
    super();
    this.state = {
      allBooks : [],
      error: '',
    }
  }
  
  componentDidMount() {
    landingFetch()
      .then(data => this.setState({allBooks: this.handleInitialData(data)}))
      .catch(err => this.setState({error : 'Sorry, there was a problem loading our suggested audiobooks. Please enter a search term to see specific results!'}, () => {console.error('error in landing fetch', err)}))
  }

  handleInitialData = (data) => {
    const allBooks = data.map(datum => datum).flat();
    let regex = new RegExp('(&nbsp;|<([^>]+)>)', 'g')
    const formattedBooks = allBooks.map(book => ({
      artist: book.artistName,
      image: book.artworkUrl100,
      price: book.collectionPrice,
      title: book.collectionName,
      genre: book.primaryGenreName,
      description: book.description.replace(regex, ''),
      date: book.releaseDate,
      filterType: book.filterType,
      id: book.collectionId
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
        <SearchForm />
        <h1>Listen<span>Later</span></h1>
        <nav>
          <NavLink to='/' className='nav'>Home</NavLink>
          {this.props.currentUser && <NavLink to='/my-collection' className='nav'>My Collection</NavLink>}
          {!this.props.currentUser && <NavLink to='/login' className='nav'>Sign In</NavLink> }
          {this.props.currentUser && <NavLink to='/' className='nav' onClick={() => this.props.setCurrentUser(null)}>Sign Out</NavLink>}
          {/* {this.props.currentUser && !this.props.favorites.length && <h2>You haven't favorited any books yet!</h2>} */}
        </nav>
      </header>
        <Route exact path='/login' render={() => {
          return(
            <>
              <LoginForm />
              <NewUserForm />
            </>)
          }} 
          />
         
      <Route 
        path = '/'
        render={() => {
          return(
            <>
          <section className="main-display">
            {this.props.selectedBook && <BookDetails book={this.props.selectedBook}/>}
            {!this.props.selectedBook && this.props.currentUser ? <h2 className='welcome-message'>Welcome {!this.props.selectedBook && this.props.currentUser.name}</h2> : <h2>Welcome, please sign in!</h2>}
          </section>
          <Route path='/my-collection' render={() => {
            return(
              <>
              <BooksDisplay books={this.props.favorites} sectionGenre='Favorites' />
              </>
            )
          }}
          />
          {(this.props.searchResults.length || null ) && <BooksDisplay 
            books={this.props.searchResults}
            sectionGenre='Search Results' />}
          {(this.state.allBooks.length || null ) && <BooksDisplay 
            books={this.filterAllBooks('romance')} 
            sectionGenre='Romances'/>}
          {(this.state.allBooks.length || null ) && <BooksDisplay 
            books={this.filterAllBooks('fantasy')} 
            sectionGenre='Fantasies'/>}
          {(this.state.allBooks.length || null ) && <BooksDisplay 
            books={this.filterAllBooks('biography')}
            sectionGenre='Biographies' />}
          {(this.state.allBooks.length || null ) && <BooksDisplay 
            books={this.filterAllBooks('history')} 
            sectionGenre='Histories'/>}
          {( this.state.allBooks.length || null ) && <BooksDisplay 
            books={this.filterAllBooks('horror')} 
            sectionGenre='Horrors'/>}
          </>
          )
        }} />
        {this.props.currentUser ? <Redirect to='/' /> : null}
    </div>
    )
  }
}

export const mapStateToProps = state => ({
  currentUser: state.currentUser,
  favorites: state.favorites,
  searchResults: state.searchResults,
  selectedBook: state.selectedBook
})

export const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  currentUser: PropTypes.object,
  favorites: PropTypes.array.isRequired,
  searchResults: PropTypes.array.isRequired,
  selectedBook: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired
}
