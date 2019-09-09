import { setSelectedBookReducer } from './setSelectedBookReducer';

describe('setSelectedBookReducer', () => {

  it('should return a book if the action type is SET_SELECTED_BOOK', () => {
    let mockBook = {title: 'Bookie'}
    
    let mockAction = {
      type: 'SET_SELECTED_BOOK',
      book: mockBook
    }

    expect(setSelectedBookReducer(undefined, mockAction))
  })

  it('should return null if type is not SET_SELECTED_BOOK and no state is passed through', () => {
    const mockAction = {
      type: 'DELETE_CURRENT_FAVORITE',
      favorite: {title: 'booky'}
    }
    expect(setSelectedBookReducer(undefined, mockAction)).toEqual(null)
  })

  it('should return initial state if type is not SET_SELECTED_BOOK', () => {
    const mockAction = {
      type: 'DELETE_CURRENT_FAVORITE',
      favorite: {title: 'booky'}
    }

    const mockState = [{title: 'Hey'}, {title: 'Hi'}]

    expect(setSelectedBookReducer(mockState, mockAction)).toEqual(mockState)
  })

})