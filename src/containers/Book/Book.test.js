import React from 'react';
import { Book } from './Book';
import { shallow } from 'enzyme';

describe('Book', () => {
  let wrapper;

  beforeEach(() => {
    wrapper=shallow(
      <Book 
        book={{title:'Book'}}
        favorites={[]}
        currentUser={null}
        setSelectedBook={jest.fn()}
        setCurrentUserFavorites={jest.fn()}
        addUserFavorite={jest.fn()}
        deleteUserFavorite={jest.fn()}
      />
    )
  })

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
})