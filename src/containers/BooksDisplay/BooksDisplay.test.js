import React from 'react';
import { shallow } from 'enzyme';
import { BooksDisplay, mapStateToProps } from './BooksDisplay';

describe('BooksDisplay', () => {

  global.Date.now = jest.spyOn(global.Date, 'now').mockImplementation(() => 12345);

  it('should match the snapshot with correct data passed in', () => {
   const mockBooks = [
     {
      artist:'Dante Alighieri',
      image:'http://someimage.com/',
      price:1,
      title:'A Tour of Turing',
      genre:'Horror',
      description:'Welcome to the secret 10th circle of Hell too chilling to be included in the Inferno!',
      date:'09/09/1320',
      filterType:'Horror',
      id:666
    },
     {
       artist:'David Gitlen',
       image:'http://davidgitlen.com/author.png',
       price:1,
       title:'Dante Was Right!',
       genre:'Memoir',
       description:'699 years to the day, somebody save me!',
       date:'09/09/2019',
       filterType:'History',
       id:111
    }
   ]
   const wrapper = shallow(<BooksDisplay 
    books={mockBooks}
    sectionGenre='Horror'
    favorites={[]}
   />);
   expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with correct data passed in if the books are from the user\'s favorites', () =>{
    const mockFavorites = [
      {
        author_name: 'Brianna DelValle',
        artwork_url: 'http://artwork.com/art.png',
        book_name: 'It\'s gonna be great!',
        primary_genre_name: 'Autobiography',
        description: 'It is gonna be great!',
        release_date: '09/09/2019',
        book_id: 222
      }
    ];

    const wrapper = shallow(<BooksDisplay 
      books={mockFavorites}
      sectionGenre='Favorites'
      favorites={mockFavorites}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should return an object with appropriate data', () => {

      const mockState = {
        currentUser: {id: 1, name: 'David'},
        favorites: [{id: 12, title: 'Twelve'}, {id: 13, title: 'Thirteen'}],
        superfluous: 'Unnecessary data!'
      };
      const expected = {
        currentUser: { id: 1, name: 'David' },
        favorites: [{ id: 12, title: 'Twelve' }, { id: 13, title: 'Thirteen' }]
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);




    })
  })

})