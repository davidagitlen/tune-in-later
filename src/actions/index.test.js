import { 
  setCurrentUser,
  setCurrentUserFavorites,
  displaySearchResults,
  addUserFavorite,
  deleteUserFavorite,
  setSelectedBook
} from './index'

describe('Actions', () => {

  describe('setCurrentUser', () => {
    it('should return an object with SET_CURRENT_USER type and a user object', () => {
      const mockUser = {name: 'Blah'}
      const expected = {
        type: 'SET_CURRENT_USER',
        user: mockUser
      }
      
      expect(setCurrentUser(mockUser)).toEqual(expected)
    })
  })

  describe('setCurrentUserFavorites', () => {
    it('should return an object with SET_CURRENT_USER_FAVORITES type and a favorites array', () => {
      const mockFavorites = []
      const expected = {
        type: 'SET_CURRENT_USER_FAVORITES',
        favorites: mockFavorites
      }

      expect(setCurrentUserFavorites(mockFavorites)).toEqual(expected)
    })
  })

  describe('displaySearchResults', () => {
    it('should return an object with DISPLAY_SEARCH_RESULTS type and a searchResults array', () => {
      const mockSearchResults = [];
      const expected = {
        type: 'DISPLAY_SEARCH_RESULTS',
        searchResults: mockSearchResults
      }

      expect(displaySearchResults(mockSearchResults)).toEqual(expected)
    })
  })

  describe('addUserFavorite', () => {
    it('should return an object with ADD_USER_FAVORITE type, a favorite object and an id', () => {
      const mockFavorite = {title: 'A Book'}
      const mockId = 2

      const expected = {
        type: 'ADD_USER_FAVORITE',
        favorite: mockFavorite,
        id: mockId
      }

      expect(addUserFavorite(mockFavorite, mockId)).toEqual(expected)
    })
  })

  describe('deleteUserFavorite', () => {
    it('should return an object with DELETE_USER_FAVORITE type and a favorite', () => {
      const mockFavorite = {title: 'A Book'};
      
      const expected = {
        type: 'DELETE_USER_FAVORITE',
        favorite: mockFavorite
      }

      expect(deleteUserFavorite(mockFavorite)).toEqual(expected)
    })
  })
  
  describe('setSelectedBook', () => {
    it('should return an object with SET_SELECTED_BOOK type and a book', () => {
      const mockBook = {title: 'Booky'}
      
      const expected = {
        type: 'SET_SELECTED_BOOK',
        book: mockBook
      }

      expect(setSelectedBook(mockBook)).toEqual(expected)
    })
 

  })

})