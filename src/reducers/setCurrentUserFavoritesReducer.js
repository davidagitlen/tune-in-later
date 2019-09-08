export const setCurrentUserFavoritesReducer = (state=[], action) => {
  switch(action.type) {
    case 'SET_CURRENT_USER_FAVORITES':
      return action.favorites;
    case 'ADD_USER_FAVORITE':
      return [...state, action.favorite];
    case 'DELETE_USER_FAVORITE' :
      const filteredFavorites = state.filter(book => book.book_id !== action.favorite.id);
      return filteredFavorites;
    default:
      return state;
  }
}