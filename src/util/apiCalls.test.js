import { 
  landingFetch, 
  loginUser, 
  addFavoriteToApi, 
  deleteFavoriteFromApi, 
} from './apiCalls';


describe('apiCalls', () => {



  // describe('landingFetch', () => {
    //mock out 4 arrays of objects
    //mock out all genre fetches
    //check them for being called with the correct url
    //mock out expected response
    //check for any error response
  // })

  describe('loginUser', () => {

    let mockUser;
    let mockOptions;

    beforeEach(() => {

      mockUser = {
        "email": 'b@g.com',
        "password": 'pass123'
      }
    
      mockOptions = {
        method: "POST",
        body: JSON.stringify(mockUser),
        headers: {
          "Content-Type": "application/json"
        }
      }

    })
   

    it('should call fetch with the correct url', () => {
      window.fetch = jest.fn()
      loginUser('b@g.com', 'pass123')

      expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/login/', mockOptions)
    })

    it('should return  a user object (happy)', () => {
      let expected = {
        id: 2,
        name: 'Leslie Knope',
        password: 'MichelleObama'
      }

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(expected)
      })

      expect(loginUser('lknope@pawnee.gov', 'MichelleObama')).resolves.toEqual(expected)      

    })

    // it('should return an error(sad)', () => {

    // })

    // Do we need to add in a catch here for the not ok resp?
    // and a test...
  })
    
  describe('addFavoriteToApi', () => {
  
    let mockBook = {
      id: 2,
      artist: 'Andy Dwyer',
      title: 'MouseRat Rules',
      image: 'the_pit.jpeg',
      date: 'today',
      description: 'I fell in the pit',
      genre: 'Musical Comedy'
    }

    let mockFavoriteBook = {
      "book_id": 2,
      "author_name": 'Andy Dwyer',
      "book_name": 'MouseRat Rules',
       "artwork_url": 'the_pit.jpeg',
      "release_date": 'today',
      "description": 'I fell in the pit',
      "primary_genre_name": 'Musical Comedy'
    }

    let mockOptions = {
      method: "POST",
      body: JSON.stringify(mockFavoriteBook),
      headers: {
        "Content-Type": "application/json"
      }
    }

    it('should call fetch with the correct url', () => {


      let expectedUrl = `http://localhost:3001/api/v1/users/2/bookfavorites`
      window.fetch = jest.fn().mockImplementation(()=>{
        return Promise.resolve()
      })
  
      addFavoriteToApi(mockBook, 2)

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, mockOptions)
    })

  })
  
  describe('deleteFavoriteFromApi', () => {

  })

  describe('fetchSearch', () => {

  })
  
  describe('getUserFavoritesFromApi', () => {

  })
  
})
