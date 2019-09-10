import React from 'react';
import { Book, mapStateToProps, mapDispatchToProps } from './Book';
import { setSelectedBook, setCurrentUserFavorites, addUserFavorite, deleteUserFavorite } from '../../actions';
import {addFavoriteToApi, deleteFavoriteFromApi} from '../../util/apiCalls';
import { shallow } from 'enzyme';

jest.mock('../../util/apiCalls');

describe('Book', () => {
  let wrapper, mockDispatch, mappedProps;
  const mockBookProp = { id: 1, title: 'Book', artist: 'David Gitlen', image: 'https://davidgitlen.com/author.png' }
  const mockSetSelectedBook = jest.fn();
  const mockSetCurrentUserFavorites = jest.fn();
  const mockAddUserFavorite = jest.fn();
  const mockDeleteUserFavorite = jest.fn();
  beforeEach(() => {
    addFavoriteToApi.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(mockBookProp)
        }
      })
    })
    mockDispatch = jest.fn();
    mappedProps = mapDispatchToProps(mockDispatch);
    wrapper=shallow(
      <Book 
        book={mockBookProp}
        favorites={[]}
        currentUser={null}
        setSelectedBook={mockSetSelectedBook}
        setCurrentUserFavorites={mockSetCurrentUserFavorites}
        addUserFavorite={mockAddUserFavorite}
        deleteUserFavorite={mockDeleteUserFavorite}
      />
    )
  })

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot if the book has been favorited', () => {
    const wrapper = shallow(<Book
      book={mockBookProp}
      favorites={[{book_id:1}]}
      currentUser={null}
      setSelectedBook={mockSetSelectedBook}
      setCurrentUserFavorites={mockSetCurrentUserFavorites}
      addUserFavorite={mockAddUserFavorite}
      deleteUserFavorite={mockDeleteUserFavorite}
    />);

    expect(wrapper).toMatchSnapshot();

  });

  it('should fire handleButtonClick when the favorites button is clicked', () => {
    const mockEvent = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    }
    wrapper.instance().handleButtonClick = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.find('button').simulate('click', mockEvent);

    expect(wrapper.instance().handleButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should fire addFavoriteToApi with the current book and user id passed in if handleButtonClick is called and the book is not currently a favorite', () => {
    const mockEvent = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    }
    
    wrapper = shallow(
      <Book
        book={mockBookProp}
        favorites={[{book_id: 20}, {book_id: 30}]}
        currentUser={{name: 'Brianna', id:12}}
        setSelectedBook={mockSetSelectedBook}
        setCurrentUserFavorites={mockSetCurrentUserFavorites}
        addUserFavorite={mockAddUserFavorite}
        deleteUserFavorite={mockDeleteUserFavorite}
      />
    )
    wrapper.instance().handleButtonClick(mockEvent);
    expect(addFavoriteToApi).toHaveBeenCalledWith(mockBookProp, 12);

  });

  it('should fire deleteFavoriteFromApi with the current book and user id passed in if handleButtonClick is called and the book is currently a favorite', () => {
    
  });

  describe('mapStateToProps', () => {

    it('should return an object with appropriate data', () => {

      const mockState = {
        currentUser: {id: 1, name: 'Divad', email: 'divad@turing.io'},
        favorites: [{id: 20}, {id: 30}],
        searchResults: [{id: 10}]
      }

      const expected = {
        currentUser: { id: 1, name: 'Divad', email: 'divad@turing.io' },
        favorites: [{ id: 20 }, { id: 30 }]
      }

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {

    it('calls dispatch with action object from setSelectedBook when card is clicked', () => {
      // const mockDispatch = jest.fn();
      const actionToDispatch = setSelectedBook(mockBookProp);
      // const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.setSelectedBook(mockBookProp);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('calls dispatch with action object from addUserFavorite when addFavoriteToApi fetch resolves', () => {
      // const mockDispatch = jest.fn();
      const actionToDispatch = addUserFavorite(mockBookProp);
      // const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.addUserFavorite(mockBookProp);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('calls dispatch with action object from deleteUserFavorite when deleteFavoriteFromApi fetch resolves', () => {

      // const mockDispatch = jest.fn();
      const actionToDispatch = deleteUserFavorite(mockBookProp);
      // const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.deleteUserFavorite(mockBookProp);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
})