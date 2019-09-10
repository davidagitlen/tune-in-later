import React from 'react'
import { LoginForm, mapStateToProps, mapDispatchToProps } from './LoginForm';
import { setCurrentUser, setCurrentUserFavorites } from '../../actions';
import { loginUser, getUserFavoritesFromApi } from '../../util/apiCalls';
import { shallow } from 'enzyme';
jest.mock('../../util/apiCalls')


describe('LoginFormContainer', () => {
  let wrapper;

  // const mockHandleInputs = jest.fn();
  const mockSetCurrentUser = jest.fn();
  const mockSetCurrentUserFavorites = jest.fn();
  const mockCurrentUser = {
    id: 1,
    name: "Joan",
    email: "exceeding@this.io"
  };

  const mockFavorites = [{
    id: 11,
    book_id: 918578041,
    user_id: 1,
    author_name: "Belmont and Belcourt Biographies",
    book_name: "Tim Tebow: An Unauthorized Biography (Unabridged)",
    artwork_url: "https://is1-ssl.mzstatic.com/image/thumb/Music1/v4/17/51/e6/1751e668-8249-cf42-5f3d-6e10c7398c1e/itunes.jpg/100x100bb.jpg",
    release_date: "2014-09-12T07:00:00Z",
    description: "Tim Tebow is one of the most talked about athletes of all time. Everybody seems to have an opinion about him, especially on his religious beliefs. But, in order to truly understand Tim Tebow, you must first understand where he came from. <i>Tim Tebow: An Unauthorized Biography</i> explores Tebow's upbringing, his high school and college football careers, and details his breakthrough into the NFL, all the way through his playoff loss to the New England Patriots. <br /><br />''Tebow-mania'' has fans and critics alike questioning his motives and looking for where God and his career will take him next. Inside, you will discover where it all started and learn why so many fans are ''Tebowing'' alongside their new national hero. From family to football to the future, all you need to know about Tim Tebow is right here, right now, in the most up to date coverage of Tim Tebow's life. <br /><br />This audiobook also includes all of Tim Tebow's college and professional football statistics.",
    primary_genre_name: "Biographies & Memoirs"
  }];

  beforeEach(() => {
    wrapper = shallow(<LoginForm
      // handleInputs={mockHandleInputs}
      // loginUser={jest.fn()}
      // getUserFavoritesFromApi={jest.fn()}
      currentUser={mockCurrentUser}
      favorites={mockFavorites}
      setCurrentUser={mockSetCurrentUser}
      setCurrentUserFavorites={mockSetCurrentUserFavorites}
    />)
  });

  describe('LoginForm', () => {
    
      it('should match the snapshot when a user is logged in', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should change the state on the input change within the form', () => {
        wrapper.find('input').at(0).simulate('change', {target: {value: 'joanclarke@turing.io', name: 'email'}});
        wrapper.find('input').at(1).simulate('change', {target: {value: 'freedom', name: 'password'}})

        expect(wrapper.state('email')).toEqual('joanclarke@turing.io');
        expect(wrapper.state('password')).toEqual('freedom');
      });
    });

    it('should call loginUser from the apiCalls when checkLoginStatus is invoked on the click', () => {
      loginUser.mockImplementation(() => {
        return Promise.resolve()
      });

      wrapper.instance().checkLoginStatus({preventDefault: jest.fn()});
      expect(loginUser).toHaveBeenCalled();
      // expect(wrapper.instance().clearLoginInputs).toHaveBeenCalled()

    });

  describe('mapStateToProps', () => {
    
      it('should return a current user object and a favorites array', () => {
        const mockState = {
          currentUser: { mockCurrentUser },
          favorites: { mockFavorites }
        };
        const mappedProps = mapStateToProps(mockState);
        expect(mappedProps).toEqual(mockState);
      });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mappedDispatchedProps = mapDispatchToProps(mockDispatch);
    it('calls dispatch on setCurrentUser action with the currentUser', () => {
      const dispatchedAction = setCurrentUser(mockCurrentUser);
      
      mappedDispatchedProps.setCurrentUser(mockCurrentUser);
      
      expect(mockDispatch).toHaveBeenCalledWith(dispatchedAction);
    });

    it('calls dispatch on setCurrentUserFavorites action with the favorites', () => {
      const dispatchedFavAction = setCurrentUserFavorites(mockFavorites);

      mappedDispatchedProps.setCurrentUserFavorites(mockFavorites);

      expect(mockDispatch).toHaveBeenCalledWith(dispatchedFavAction);
    });
  });
});