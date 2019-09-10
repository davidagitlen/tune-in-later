import React from 'react';
import { shallow } from 'enzyme';
import { NewUserForm } from './NewUserForm';

describe('NewUserForm', () => {

  let wrapper; 
  let mockSetCurrentUser;

  beforeEach(() => {

    mockSetCurrentUser = jest.fn();

    wrapper = shallow(<NewUserForm 
      setCurrentUser={mockSetCurrentUser}
    />)
  })

  it('should match the snapshot with correct data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('')

  describe('clearNewUserInputs', () => {
    it('should clear inputs', () => {
      
      wrapper.setState({
        name: 'Brianna',
        email: 'B@gmail.com',
        password: 'password'
      })

      const expected = {
        name: '',
        email: '',
        password: '',
        error: ''
      }
      wrapper.instance().clearNewUserInputs();

      expect(wrapper.state()).toEqual(expected)
      
    })
  })
 
})