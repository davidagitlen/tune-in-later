export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  user
});

export const setCurrentUserFavorites = favorites => ({
  type: 'SET_CURRENT_USER_FAVORITES',
  favorites
});

export const displaySearchResults = searchResults => ({
  type: 'DISPLAY_SEARCH_RESULTS',
  searchResults
});

export const addUserFavorite = (favorite, id) => ({
  type: 'ADD_USER_FAVORITE',
  favorite,
  id
});

export const deleteUserFavorite = (favorite) => ({
  type: 'DELETE_USER_FAVORITE',
  favorite
});

export const setSelectedBook = book => ({
  type: 'SET_SELECTED_BOOK',
  book
});
