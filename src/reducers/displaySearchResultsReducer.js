export const displaySearchResultsReducer = (state=[], action) => {
  switch(action.type) {
    case 'DISPLAY_SEARCH_RESULTS':
      return action.searchResults;
    default:
      return state;
  }
}