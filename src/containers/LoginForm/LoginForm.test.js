import React from 'react'
import { LoginForm, mapStateToProps, mapDispatchToProps } from './LoginForm';
import { shallow } from 'enzyme';

describe('LoginForm', () => {
  let wrapper;

  const mockSetCurrentUser = jest.fn();
  const mockSetCurrentUserFavorites = jest.fn();
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
  const mockCurrentUser = {
    id: 1,
    name: "Joan",
    email: "exceeding@this.io"
  };
  
  beforeEach(() => {
    wrapper = shallow(<LoginForm 
      currentUser={ mockCurrentUser } 
      favorites={ mockFavorites } 
      setCurrentUser={ mockSetCurrentUser } 
      setCurrentUserFavorites={ mockSetCurrentUserFavorites } 
    />)

  });

    it('should match the snapshot when a user is logged in', () => {
      expect(wrapper).toMatchSnapshot();
    });

    // it('should return a current user')
});