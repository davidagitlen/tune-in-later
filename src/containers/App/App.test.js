import React from 'react';
import { mapDispatchToProps, App } from './App'
import { shallow } from 'enzyme';
import { setCurrentUser } from '../../actions';

describe('App', () => {

  let wrapper;
  let mockCurrentUser = null;
  let mockFavorites = [];
  let mockSearchResults = [];
  let mockSelectedBook = null;

  beforeEach(() => {

    wrapper = shallow(
      <App 
        favorites={mockFavorites}
        currentUser={mockCurrentUser}
        searchResults={mockSearchResults}
        selectedBook={mockSelectedBook}
        setCurrentUser={jest.fn()}
      />
    )
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('mapDispatchToProps', () => {
    it('calls dispatch with a setCurrentUser action when setCurrentUser is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setCurrentUser({name:'Dorbid'})

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCurrentUser({name:'Dorbid'})

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)

    })
  })
})

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// })


