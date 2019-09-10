import React from 'react';
import { shallow } from 'enzyme';
import { SearchForm } from './SearchForm';
import { fetchSearch } from '../../util/apiCalls';

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

      
    })
  })

  describe('cleanSearchResults', () => {

  })

  describe('matchDispatchToProps', () => {

  })

})