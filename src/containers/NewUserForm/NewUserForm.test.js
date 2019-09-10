import React from 'react';
import { shallow } from 'enzyme';
import { NewUserForm } from './NewUserForm';
import { addNewUserFetch } from '../../util/apiCalls';

jest.mock('../../util/apiCalls')

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

  describe('handleNewUserInputs', () => {
    it('should update name with input value', () => {
      const mockEventNameChange = {
          target: {
            name: 'name',
            value: 'Mork'
          }
      }

      const expectedNameChangeState = {
        name: 'Mork',
        email: '',
        password: '',
        error: ''
      }

      wrapper.instance().handleNewUserInputs(mockEventNameChange);

      expect(wrapper.state()).toEqual(expectedNameChangeState)
    })

    it('should update email with input value', () => {
      const mockEventEmailChange = {
          target: {
            name: 'email',
            value: 'blah@blah.blah'
          }
      }

      const expectedEmailChangeState = {
        name: '',
        email: 'blah@blah.blah',
        password: '',
        error: ''
      }

      wrapper.instance().handleNewUserInputs(mockEventEmailChange);

      expect(wrapper.state()).toEqual(expectedEmailChangeState)
    })

    it('should update password with input value', () => {
      const mockEventPasswordChange = {
          target: {
            name: 'password',
            value: 'Plassword'
          }
      }

      const expectedPasswordChangeState = {
        name: '',
        email: '',
        password: 'Plassword',
        error: ''
      }

      wrapper.instance().handleNewUserInputs(mockEventPasswordChange);

      expect(wrapper.state()).toEqual(expectedPasswordChangeState)
    })
  })

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

  describe('handleSubmitNewUser', () => {

    let mockEvent = { preventDefault: () => {}}
    

    it('should fire addNewUserFetch', () => {


      wrapper.instance().handleSubmitNewUser(mockEvent)
      expect(addNewUserFetch).toHaveBeenCalled();
    })

    it('should fire setCurrentUser prop', () => {

      wrapper.instance().handleSubmitNewUser(mockEvent)
      expect(mockSetCurrentUser).toHaveBeenCalled();

    })

    it('should fire clearNewUserInputs', () => {

      wrapper.instance().clearNewUserInputs = jest.fn()
      wrapper.instance().forceUpdate();

      wrapper.instance().handleSubmitNewUser(mockEvent)
      expect(wrapper.instance().clearNewUserInputs).toHaveBeenCalled();
    })
  })

  describe('mapDispatchToProps', () => {

  })
 
})