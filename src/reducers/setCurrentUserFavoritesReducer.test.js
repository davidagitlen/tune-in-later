import { setCurrentUserFavoritesReducer } from './setCurrentUserFavoritesReducer';

describe('setCurrentUserFavoritesReducer', () => {

  it('should return the default state if the action type does not match any case in the switch statement', () => {

    expect(setCurrentUserFavoritesReducer(undefined, {type: 'BOO!'})).toEqual([]);
  });

  it('should return the favorites of the setCurrentUserFavorite\'s action when the setCurrentUserFavorites action is dispatched to it', () => {
    const mockSetCurrentUserFavoritesAction = {
      type: 'SET_CURRENT_USER_FAVORITES',
      favorites: [
        {title: 'Sleep; Crying Myself To...'}, 
        {title: 'Eating Too Much'},
      ]
    };
    const expected = [
      { title: 'Sleep; Crying Myself To...' },
      { title: 'Eating Too Much' },
    ];

    expect(setCurrentUserFavoritesReducer(undefined, mockSetCurrentUserFavoritesAction)).toEqual(expected);
  });

  it('should add the favorite object in the action to initial state when the addUserFavorite action is dispatched to it', () => {
    const mockAddUserFavoriteAction = {
      type: 'ADD_USER_FAVORITE',
      favorite: {title: 'Another one!'}
    };
    const initialState = [{title: 'Here\'s one!'}]
    const expected = [...initialState, {title: 'Another one!'}];

    expect(setCurrentUserFavoritesReducer(initialState, mockAddUserFavoriteAction)).toEqual(expected);
  });

  it('should remove the matching object from the initial state when the deleteUserFavorite action is dispatched to it', () => {
    const mockDeleteUserFavoriteAction = {
      type: 'DELETE_USER_FAVORITE',
      favorite: {title: 'Get outta here!', id: 1}
    };
    const initialState = [{title: 'Get outta here!', book_id: 1}, {title: 'I should stay', book_id: 2}]
    const expected = [{title: 'I should stay', book_id: 2}];

    expect(setCurrentUserFavoritesReducer(initialState, mockDeleteUserFavoriteAction)).toEqual(expected);
  });

});