export const setSelectedBookReducer = (state=null, action) => {
  switch(action.type) {
    case 'SET_SELECTED_BOOK':
      return action.book;
    default:
      return state;
  }
}