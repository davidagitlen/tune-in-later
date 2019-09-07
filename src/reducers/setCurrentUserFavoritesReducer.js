export const setCurrentUserFavoritesReducer = (state=[]], action) => {
  switch(action.type) {
    case 'SET_CURRENT_USER_FAVORITES':
      return action.user;
    default:
      return state;
  }
}