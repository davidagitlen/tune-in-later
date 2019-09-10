import React from 'react';
import { shallow } from 'enzyme';
import { SearchForm } from './SearchForm';




describe('SearchForm', () => {

  let wrapper; 

  beforeEach(() => {
    wrapper = shallow(
      <SearchForm 
        displaySearchResults={jest.fn()}
      />
    )
  })

  it('should match the snapshot with correct data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  })
})