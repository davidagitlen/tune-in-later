import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';

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
})


