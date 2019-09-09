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
  let mockBook;
  let mockData;
  let mockFormattedBook;
  let expectedFormattedBooks;


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

    mockBook = {
      artistName: 'Ron Swanson',
      artworkUrl100: 'bacon.jpg',
      collectionPrice: 200.99,
      collectionName: 'Pyramid of Greatness',
      primaryGenreName: 'History',
      description: 'Eat meat.',
      releaseDate: '1776',
      filterType: 'History',
      collectionId: 994923
    }

    mockData = [
      [mockBook, mockBook],
      [mockBook],
      [mockBook, mockBook, mockBook]
    ]

    mockFormattedBook = {
      artist: 'Ron Swanson',
      image: 'bacon.jpg',
      price: 200.99,
      title: 'Pyramid of Greatness',
      genre: 'History',
      description: 'Eat meat.',
      date: '1776',
      filterType: 'History',
      id: 994923
    }

    expectedFormattedBooks = [
      mockFormattedBook,
      mockFormattedBook,
      mockFormattedBook,
      mockFormattedBook,
      mockFormattedBook,
      mockFormattedBook,    
    ]

  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('handleInitialData', () => {

    it('should format the arrays coming from the fetch', () => {

      
      expect(wrapper.instance().handleInitialData(mockData)).toEqual(expectedFormattedBooks)
    })

  })

  describe('filterAllBooks', () => {

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




