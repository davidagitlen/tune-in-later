import React, { Component } from 'react';
import LoginForm from '../components/Forms/LoginForm/LoginForm';
import { landingFetch, authorFetch } from '../util/apiCalls';
import './App.css';
import NewUserForm from '../containers/NewUserForm';

class App extends Component{
  constructor() {
    super();
    this.state = {
      romances: [],
      fantasies: [],
      biographies: [],
      histories: [],
      horrors: [],
      authorWorks: []
    }
  }
  
  componentDidMount() {
    landingFetch()
      .then(data => {
        let romanceData = data[0];
        let fantasyData = data[1];
        let biographyData = data[2];
        let historyData = data[3];
        let horrorData = data[4]
      
        this.setState({romances: romanceData, fantasies: fantasyData, biographies: biographyData, histories: historyData, horrors: horrorData}, () => {console.log(this.state)})
      })
      .catch(err => console.log(err, 'error in componentDidMount from landingFetch'))

    authorFetch('lois', 'lowry') 
      .then(data => this.setState({
        authorWorks : data.results.map(datum => ({
          artist: datum.artistName,
          image: datum.artworkUrl100,
          price: datum.collectionPrice,
          name: datum.collectionName,
          genre: datum.primaryGenreName,
          description: datum.description
            }
        )
    )}, () => {console.log(this.state)}))
      .catch(err => console.log(err, 'error in componentDidMount from authorFetch'))

  }
  render() { 
    return (
    <div className="App">
      <header>
        <h1>FETCH ATTEMPTS!</h1>
      </header>
      <LoginForm />
      <NewUserForm />
    </div>
    )
  }
}

export default App;
