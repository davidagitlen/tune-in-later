import React from 'react';
import { shallow } from 'enzyme';
import BookDetails from './BookDetails';

describe('BookDetails', () => {
  it('should match the snapshot with correct data passed in', () => {
    const mockBook = {
      title:'The Hell of Incessant Testing',
      author:'David Gitlen',
      genre:'Memoir',
      price: 1,
      description:'Chilling true tales from the basement of the Guaranty Bank building!',
      image:'http://www.davidgitlen.com/author.png'
    }
    const wrapper = shallow(<BookDetails 
      book={mockBook}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});