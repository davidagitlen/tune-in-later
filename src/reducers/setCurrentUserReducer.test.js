import { setCurrentUserReducer } from './setCurrentUserReducer';

describe('setCurrentUserReducer', () => {
  it('should return a user if action.type is SET_CURRENT_USER', () => {
    let mockUser = {name: 'Joe'}
    
    let mockAction = {
      type: 'SET_CURRENT_USER',
      user: mockUser
    }


    expect(setCurrentUserReducer(undefined, mockAction)).toEqual(mockUser)
  })

  it('should return null if action.type does not match and no state is passed through', () => {
    let mockAction = {
      type: 'DELETE_FAVORITE',
      favorite: {title: 'Blah'}
    }
    expect(setCurrentUserReducer(undefined, mockAction)).toEqual(null)
  })

  it('should return initial state if action.type does not match', () => {
    let mockAction = {
      type: 'DELETE_FAVORITE',
      favorite: {title: 'Bloop'}
    }

    let mockState = {name:'Hal'}
  
    expect(setCurrentUserReducer(mockState, mockAction)).toEqual(mockState)
  })

})