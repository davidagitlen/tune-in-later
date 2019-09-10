import React from 'react';
import { shallow } from 'enzyme';
import { SearchForm, mapDispatchToProps } from './SearchForm';
import { fetchSearch } from '../../util/apiCalls';
import { displaySearchResults } from '../../actions/index';

jest.mock('../../util/apiCalls');

describe('SearchForm', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
    <SearchForm 
      displaySearchResults={jest.fn()}
    />)
  })
  it('should match the snapshot with correct data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('handleSearchInput', () => {
    it('should update state with the search input', () => {
      let mockEvent = {
        target: {
          value: 'Jack Johnson'
        }
      }

      let expected = {
        searchTerm: 'Jack Johnson',
        results: []
      }

      wrapper.instance().handleSearchInput(mockEvent);

      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('clearSearch', () => {
    it('should clear the sarchTerm in state', () => {
      wrapper.setState({
        searchTerm: 'Blah blah blah',
        results: [{title: 'A Book'}]
      })

      const expected = {
        searchTerm: '',
        results: [{title: 'A Book'}]
      }

      wrapper.instance().clearSearch();

      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('handleSearch', () => {

    let wrapper;
    let mockDisplaySearchResults;
    let mockEvent;

    beforeEach(() => {

      mockEvent = {
        preventDefault: () => {}
      }
  
      fetchSearch.mockImplementation(() => {
        return Promise.resolve({
          results: [{title:'blah'}, {title: 'blah blah'}]
        })
      })
  
      mockDisplaySearchResults = jest.fn()
  
      wrapper = shallow(
        <SearchForm 
          displaySearchResults={mockDisplaySearchResults}
        />
      )
    })

    it('should fire displaySearchResults with an empty array', () => {
      wrapper.instance().cleanSearchResults = jest.fn();
      wrapper.instance().clearSearch = jest.fn();    

      wrapper.instance().handleSearch(mockEvent);
      expect(mockDisplaySearchResults).toHaveBeenCalledWith([]);
    })

    it('should fire fetchSearch with the searchTerm', () => {
      wrapper.instance().cleanSearchResults = jest.fn();
      wrapper.instance().clearSearch = jest.fn();    

      wrapper.setState({
        searchTerm: 'Ron Swanson'
      })
      wrapper.instance().handleSearch(mockEvent);
      expect(fetchSearch).toHaveBeenCalledWith('Ron Swanson')
    })

    it('should fire cleanSearchResults with the fetch results', async () => {

      wrapper.instance().cleanSearchResults = jest.fn();
      wrapper.instance().clearSearch = jest.fn();    
      wrapper.instance().forceUpdate();

      await wrapper.instance().handleSearch(mockEvent);
      expect(wrapper.instance().cleanSearchResults).toHaveBeenCalledWith([{title:'blah'}, {title: 'blah blah'}])
    })

    it('should fire displaySearchResults with the cleaned results', async () => {
      wrapper.instance().cleanSearchResults = jest.fn().mockImplementation(() => {
        return [{title:'blah'}, {title: 'blah blah'}]
      })
      wrapper.instance().clearSearch = jest.fn();    
      

      await wrapper.instance().handleSearch(mockEvent);

      expect(wrapper.instance().props.displaySearchResults).toHaveBeenCalledTimes(2)

    })

    it('should fire clearSearch', () => {
      wrapper.instance().cleanSearchResults = jest.fn().mockImplementation(() => {
        return [{title:'blah'}, {title: 'blah blah'}]
      })
      wrapper.instance().clearSearch = jest.fn();    
      
      wrapper.instance().handleSearch(mockEvent)

      expect(wrapper.instance().clearSearch).toHaveBeenCalled();

    })
  })

  describe('cleanSearchResults', () => {
    it('should return properly formatted books', () => {
      
      let mockBook = {"wrapperType":"audiobook",
      "artistId":152264779,
      "collectionId":366048490,
      "artistName":"Kurt Bruner and Jim Ware",
      "collectionName":"Finding God in The Lord of the Rings (Unabridged)",
      "collectionCensoredName":"Finding God in The Lord of the Rings (Unabridged)",
      "artistViewUrl":"https://books.apple.com/us/author/kurt-bruner-and-jim-ware/id152264779?uo=4",
      "collectionViewUrl":"https://books.apple.com/us/audiobook/finding-god-in-the-lord-of-the-rings-unabridged/id366048490?uo=4",
      "artworkUrl60":"https://is2-ssl.mzstatic.com/image/thumb/Music/c2/d9/90/mzi.dgbadmjh.jpg/60x60bb.jpg",
      "artworkUrl100":"https://is2-ssl.mzstatic.com/image/thumb/Music/c2/d9/90/mzi.dgbadmjh.jpg/100x100bb.jpg",
      "collectionPrice":11.99,
      "collectionExplicitness":"notExplicit",
      "trackCount":1,
      "copyright":"℗ © 2003 Oasis Audio",
      "country":"USA",
      "currency":"USD",
      "releaseDate":"2003-01-01T08:00:00Z",
      "primaryGenreName":"Religion & Spirituality",
      "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/bc/f1/f6/bcf1f6b3-988d-7594-3ded-64cc9f9fb34f/mzaf_255838896557730526.std.aac.p.m4a",
      "description":"Recently named the #1 piece of 20th century literature, <i>The Lord of the Rings<\/i> trilogy is more than a great story. It's a much-needed reminder that, like J.R.R. Tolkien's hobbits, Christians are all on an epic quest. In examining the Christian themes in the trilogy, authors Kurt Bruner and Jim Ware find that truth and fiction are not as far apart as they seem. Even though Tolkien never intended for these books to present the Gospel, when read in the light of the Scripture, they offer a rich tapestry of redemption, values, and faith against all odds.",
      "filterType": "History"  
    }

     
      let mockSearchResults = [
        mockBook,
        mockBook
      ]


      let mockCleanedBook = {
        id: 366048490,
        date: "2003-01-01T08:00:00Z", 
        artist: "Kurt Bruner and Jim Ware",
        image: "https://is2-ssl.mzstatic.com/image/thumb/Music/c2/d9/90/mzi.dgbadmjh.jpg/100x100bb.jpg",
        price: 11.99,
        title: "Finding God in The Lord of the Rings (Unabridged)",
        genre: "Religion & Spirituality",
        description: "Recently named the #1 piece of 20th century literature, The Lord of the Rings trilogy is more than a great story. It\'s a much-needed reminder that, like J.R.R. Tolkien\'s hobbits, Christians are all on an epic quest. In examining the Christian themes in the trilogy, authors Kurt Bruner and Jim Ware find that truth and fiction are not as far apart as they seem. Even though Tolkien never intended for these books to present the Gospel, when read in the light of the Scripture, they offer a rich tapestry of redemption, values, and faith against all odds.",
        filterType: "History"
        }
        
      let expected = [
        mockCleanedBook,
        mockCleanedBook
      ]

      expect(wrapper.instance().cleanSearchResults(mockSearchResults)).toEqual(expected)

    })
  })

  describe('mapDispatchToProps', () => {
    it('calls dispatch with displaySearchResults action when search is initiated', () => {
      const mockDispatch = jest.fn();

      let mockSearchResults = [
        {title: 'book1'},
        {title: 'book2'}
      ]

      const actionToDispatch = displaySearchResults(mockSearchResults)

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.displaySearchResults(mockSearchResults)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

})
