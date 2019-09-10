import {
  addNewUserFetch,
  landingFetch,
  loginUser, 
  fetchSearch,
  addFavoriteToApi, 
  deleteFavoriteFromApi, 
  getUserFavoritesFromApi
} from './apiCalls';


describe('apiCalls', () => {


  describe('landingFetch', () => {

    it('should call fetch with the correct urls passed in', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });

      const mockUrlsArray = ['https://itunes.apple.com/search?media=audiobook&term=romance&explicit=No', 'https://itunes.apple.com/search?media=audiobook&term=fantasy&explicit=No', 'https://itunes.apple.com/search?media=audiobook&term=biography&explicit=No', 'https://itunes.apple.com/search?media=audiobook&term=history&explicit=No', 'https://itunes.apple.com/search?media=audiobook&term=horror&explicit=No'];

      landingFetch();
      expect(window.fetch).toHaveBeenCalledWith(mockUrlsArray[0]);
      expect(window.fetch).toHaveBeenCalledWith(mockUrlsArray[1]);
      expect(window.fetch).toHaveBeenCalledWith(mockUrlsArray[2]);
      expect(window.fetch).toHaveBeenCalledWith(mockUrlsArray[3]);
      expect(window.fetch).toHaveBeenCalledWith(mockUrlsArray[4]);
    });

    it('should return an array of objects with the appropriate keys added (HAPPY)', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{title: 'Romance'}, {title: 'Fantasy'}, {title: 'Biography'}, {title: 'History'}, {title: 'Horror'} ])
        });
      });

      const expected = [{ title: 'Romance', filterType: 'romance' }, { title: 'Fantasy', filterType: 'fantasy' }, { title: 'Biography', filterType: 'biography' }, { title: 'History', filterType: 'history' }, { title: 'Horror', filterType: 'horror' }]

      landingFetch();

      expect(landingFetch()).resolves.toEqual(expected);
    });

    it('should return an error message when the fetch is not successful(SAD)', () => {

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject('Landing fetch was not successful.')
      });

      landingFetch();
      expect(landingFetch()).rejects.toEqual('Landing fetch was not successful');
    });
  });

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
          ok: true, 
          json: () => Promise.resolve()
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

    it('should return an error if the fetch is not successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Error logging in user'))
      })

      expect(loginUser('lknope@pawnee.gov', 'MichelleObama')).rejects.toEqual(Error('Error logging in user'))
    })

    it('should return an error if the response is not ok (sad)', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
        })
      })

      expect(loginUser('lknope@pawnee.gov', 'MichelleObama')).rejects.toEqual(Error('Error logging in'))
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
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        })
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

      expect(addFavoriteToApi(mockBook, 2)).rejects.toEqual(Error('Error posting favorite'))
    })
    it('should throw an error if fetch is unsuccessful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('There was an error adding the favorite'))
      })

      expect(addFavoriteToApi(mockBook, 2)).rejects.toEqual(Error('There was an error adding the favorite'))
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
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      })
  
      const options = {
        method: "DELETE"
      }
  
      deleteFavoriteFromApi(mockBook, 5)
  
      expect(window.fetch).toHaveBeenCalledWith(`http://localhost:3001/api/v1/users/5/bookfavorites/2`, options)
    })

    it('should return an ok status if successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve('success')
        })
      })
    
      expect(deleteFavoriteFromApi(mockBook, 5)).resolves.toEqual('success')
    })

    it('should return an error if status is not ok', () => {

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          
        })
      })

      expect(deleteFavoriteFromApi(mockBook, 5)).rejects.toEqual(Error('There was an error deleting the favorite'))
    })

    it('should throw an error if fetch is not successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('There was an error deleting the favorite'))
      })


      expect(deleteFavoriteFromApi(mockBook, 5)).rejects.toEqual(Error('There was an error deleting the favorite'))
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

      expect(fetchSearch('blah')).rejects.toEqual(Error('Error getting search results'));
    })
    it('should throw an error when rejected', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Error getting search results'))
      })

      expect(fetchSearch('blah')).rejects.toEqual(Error('Error getting search results'));
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
    });

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

    });

    it('should throw an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve()
        }) 
      })

      expect(getUserFavoritesFromApi(2)).rejects.toEqual(Error('Error getting favorites'))
    });
  });

  describe('addNewUserFetch', () => {

    it('should fire fetch with the correct url', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        })
      });
      const mockUser = {
        name: 'Bernonda OfTheValley',
        email: 'perfidious_punctuation@gmail.com',
        password: 'lieslieslies'
      };

      const body = mockUser;

      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };

      const expectedURL = 'http://localhost:3001/api/v1/users'

      addNewUserFetch(mockUser);

      expect(window.fetch).toHaveBeenCalledWith(expectedURL, options);
    });

    it('should return the passed in user object with an id assigned to it', () => {

      const mockUser = {
        name: 'Bernonda OfTheValley',
        email: 'perfidious_punctuation@gmail.com',
        password: 'lieslieslies'
      }

      const expectedResponse = {
        name: 'Bernonda OfTheValley',
        email: 'perfidious_punctuation@gmail.com',
        password: 'lieslieslies',
        id: 12
      }

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({...mockUser, id: 12})
        })
      })

      expect(addNewUserFetch(mockUser)).resolves.toEqual(expectedResponse);

    });

    it('should throw an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve()
        })
      });

      const mockUser = {
        name: 'Bernonda OfTheValley',
        email: 'perfidious_punctuation@gmail.com',
        password: 'lieslieslies'
      }

      expect(addNewUserFetch(mockUser)).rejects.toEqual(Error('Something went wrong'))
    });

    it('should throw an error if the promise is rejected', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('There was a problem adding the new user!'))
      });

      const mockUser = {
        name: 'Bernonda OfTheValley',
        email: 'perfidious_punctuation@gmail.com',
        password: 'lieslieslies'
      };

      expect(addNewUserFetch(mockUser)).rejects.toEqual('There was a problem adding the new user!');
    });

  });
  
})
