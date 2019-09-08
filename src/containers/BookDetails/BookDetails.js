import React from 'react';
import './BookDetails.scss';

const BookDetails = ({book}) => {
  
  const {title, author, genre, price, description} = book
  
  return(
  
    <div className="BookDetails">
      <img></img>
      <div class="bookInfo">
        <h2>{title}</h2>
        <h3>{author}</h3>
        <p>{genre} </p>
        <p>{price}</p>
      </div>
      <div class="description">
        <p>Buffalo brisket tongue burgdoggen ground round pork loin picanha shoulder biltong beef porchetta spare ribs prosciutto bacon landjaeger. Meatloaf pork chop tri-tip buffalo. Drumstick shankle short loin, landjaeger strip steak pork chop sirloin cow flank ham hock ball tip. Andouille short loin drumstick tail kielbasa sirloin cow.

Doner flank kevin cupim ham tail venison alcatra ball tip tenderloin short loin sirloin pork swine t-bone. Chicken flank andouille meatloaf rump. Ribeye pastrami tenderloin brisket andouille shank prosciutto rump meatloaf. Rump meatloaf sirloin jerky, hamburger prosciutto bresaola spare ribs. Shank chicken meatball, chuck tri-tip filet mignon pancetta. Frankfurter rump cow fatback jerky kevin salami.</p>
      </div>
    </div>
  )
}

export default BookDetails;