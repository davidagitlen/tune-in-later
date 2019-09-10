import { 
  landingFetch, 
  loginUser, 
  fetchSearch,
  addFavoriteToApi, 
  deleteFavoriteFromApi, 
  getUserFavoritesFromApi
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
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true
        });
      }) 
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
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expected)
      })
    })

      expect(loginUser('lknope@pawnee.gov', 'MichelleObama')).resolves.toEqual(expected)      

    })

    it('should return an error if the response is not ok (sad)', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
        })
      })

      expect(loginUser('lknope@pawnee.gov', 'MichelleObama')).resolves.toEqual(Error('Error logging in'))

    })

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

    it('should return an object when fetch is successful', () => {
      let expectedResponse = {
        "id": 2, 
        "user_id": 1, 
        "album_id": 558262493, 
        "artist_name": "alt-J", 
        "album_name": "An Awesome Wave", 
        "artwork_url": 
        "https://is5-ssl.mzstatic.com/image/thumb/Music/v4/3b/43/9e/3b439e7f-9989-1dc1-9ffb-8d876ddb0da1/source/100x100bb.jpg", 
        "release_date": "2012-09-18T07:00:00Z", 
        "content_advisory_rating": "notExplicit", 
        "primary_genre_name": "Alternative"
      }

      window.fetch = jest.fn().mockImplementation(()=>{
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expectedResponse)
        })
      })

     

      expect(addFavoriteToApi(mockBook, 2)).resolves.toEqual(expectedResponse)

    })

    it('should throw an error if response is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      })

      expect(addFavoriteToApi(mockBook, 2)).resolves.toEqual(Error('Error posting favorite'))
    })

  })
  
  describe('deleteFavoriteFromApi', () => {


    let mockBook = {
      id: 2,
      artist: 'Andy Dwyer',
      title: 'MouseRat Rules',
      image: 'the_pit.jpeg',
      date: 'today',
      description: 'I fell in the pit',
      genre: 'Musical Comedy'
    }
    it('should be called with the correct URL', () => {

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve();
      })
  
      const options = {
        method: "DELETE"
      }
  
      deleteFavoriteFromApi(mockBook, 5)
  
      expect(window.fetch).toHaveBeenCalledWith(`http://localhost:3001/api/v1/users/5/bookfavorites/2`, options)
    })

    it('should return an error if status is not ok', () => {

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          
        })
      })

      deleteFavoriteFromApi(mockBook, 5)

      expect(deleteFavoriteFromApi(mockBook, 5)).resolves.toEqual(Error('Error posting favorite'))
    })
    
  })

  describe('fetchSearch', () => {
    it('should fire the fetch call with the correct URL', () => {

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        })
      })

      fetchSearch('Nick Offerman');

      const expectedURL = 'https://itunes.apple.com/search?media=audiobook&term=Nick+Offerman'
    
      expect(window.fetch).toHaveBeenCalledWith(expectedURL)
    })

    it('should return an array of search results when successful', () => {
      let expectedResponse = [
        {title: 'Book234234'},
        {title: 'Book23094823094'}
      ]

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expectedResponse)
        })
      })

      expect(fetchSearch('Nick Offerman')).resolves.toEqual(expectedResponse)
    })

    it('should throw an error when status is not ok', () => {

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve()
        }) 
      })

      expect(fetchSearch('blah')).resolves.toEqual(Error('Error getting search results'));
    })
  })
  
  describe('getUserFavoritesFromApi', () => {

    it('should fire fetch with the correct url', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        }) 
      })

      let expectedURL = 'http://localhost:3001/api/v1/users/6/bookfavorites/'

      getUserFavoritesFromApi(6);

      expect(window.fetch).toHaveBeenCalledWith(expectedURL);
    })

    it('should return an array of favorites when successful', () => {

      let expectedResponse = [
        {title: 'Book1'},
        {title: 'Book2'}
      ]

      window.fetch = jest.fn().mockImplementation(() =>  {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expectedResponse)
        })
      }) 

      expect(getUserFavoritesFromApi(6)).resolves.toEqual(expectedResponse);

    })

    it('should throw an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve()
        }) 
      })

      expect(getUserFavoritesFromApi(2)).resolves.toEqual(Error('Error getting favorites'))
    })

  })
  
})
