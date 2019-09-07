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

})

export const addUserFavorite = favorite => ({
  type: 'ADD_USER_FAVORITE',
  favorite
})