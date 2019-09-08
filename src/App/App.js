import React, { Component } from 'react';
import BooksDisplay from '../containers/BooksDisplay/BooksDisplay';
import LoginForm from '../containers/LoginForm/LoginForm';
import { landingFetch, authorFetch } from '../util/apiCalls';
import './App.scss';
import NewUserForm from '../containers/NewUserForm/NewUserForm';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions';
import SearchForm from '../containers/SearchForm/SearchForm';
import BookDetails from '../containers/BookDetails/BookDetails'

class App extends Component{
  constructor() {
    super();
    this.state = {
      allBooks : [],
      error: '',
    }
  }
  
  componentDidMount() {
    landingFetch()
      .then(data => this.setState({allBooks: this.handleInitialData(data)}, () => {console.log(data)}))
      .catch(err => this.setState({error : 'Sorry, there was a problem loading our suggested audiobooks. Please enter a search term to see specific results!'}, () => {console.error('error in landing fetch', err)}))
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
        <h1>ListenLater</h1>
        <nav>
          <NavLink to='/' className='nav'>Home</NavLink>
          {!this.props.currentUser && <NavLink to='/login' className='nav'>Sign In</NavLink> }
          {this.props.currentUser && <NavLink to='/' className='nav' onClick={() => this.props.setCurrentUser(null)}>Sign Out</NavLink>}
          {this.props.currentUser ? <h2 className='welcome-message'>Welcome {this.props.currentUser.name}</h2> : <h2>Welcome, please sign in!</h2>}
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
          </section>


          {this.props.searchResults.length && <BooksDisplay 
            books={this.props.searchResults}
            sectionGenre='Search Results' />}
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
            sectionGenre='Horrors'/>}
          </>
          )

        }} />
        {this.props.currentUser ? <Redirect to='/' /> : null}
    </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  favorites: state.favorites,
  searchResults: state.searchResults,
  selectedBook: state.selectedBook
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
