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

  })

  describe('clearSearch', () => {

  })

  describe('handleSearch', () => {

  })

  describe('cleanSearchResults', () => {

  })

  describe('matchDispatchToProps', () => {
    
  })

})