export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  user
});

export const setCurrentUserFavorites = favorites => ({
  type: 'SET_CURRENT_USER_FAVORITES',
  favorites
});