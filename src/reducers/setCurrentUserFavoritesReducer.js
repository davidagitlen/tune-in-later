export const setCurrentUserFavoritesReducer = (state=[], action) => {
  switch(action.type) {
    case 'SET_CURRENT_USER_FAVORITES':
      return action.favorites;
    case 'ADD_USER_FAVORITE':
      return [...state, action.favorite];
    default:
      return state;
  }
}