import { displaySearchResultsReducer } from './displaySearchResultsReducer';

describe('displaySearchResultsReducer', () => {

  const mockSearchResults = [{
    id: 11,
    book_id: 918578041,
    user_id: 1,
    author_name: "Belmont and Belcourt Biographies",
    book_name: "Tim Tebow: An Unauthorized Biography (Unabridged)",
    artwork_url: "https://is1-ssl.mzstatic.com/image/thumb/Music1/v4/17/51/e6/1751e668-8249-cf42-5f3d-6e10c7398c1e/itunes.jpg/100x100bb.jpg",
    release_date: "2014-09-12T07:00:00Z",
    description: "Tim Tebow is one of the most talked about athletes of all time. Everybody seems to have an opinion about him, especially on his religious beliefs. ",
    primary_genre_name: "Biographies & Memoirs"
  },
  {
    id: 12,
    book_id: 918578042,
    user_id: 1,
    author_name: "Breaking Biographies",
    book_name: "Another Biography",
    artwork_url: 'http://images.unsplash.com',
    release_date: "2015-09-12T07:00:00Z",
    description: "I've got a lot to say and so little time. ",
    primary_genre_name: "Biographies & Memoirs"
  }];

  const mockActionObjectForDefault = {
    type: undefined,
    searchResults: []
  }

  const mockActionObject = {
    type: 'DISPLAY_SEARCH_RESULTS',
    searchResults: mockSearchResults
  }
  
  it('should return state by default', () => {
    expect(displaySearchResultsReducer([], mockActionObjectForDefault)).toEqual([]);
  });

  it('should show audiobooks filtered by the search term and hold those books in store under searchResults if the type matches DISPLAY_SEARCH_RESULTS', () => {
    expect(displaySearchResultsReducer([], mockActionObject)).toEqual(mockSearchResults);
  });
  
})