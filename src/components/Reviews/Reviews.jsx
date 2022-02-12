import React from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Reviews.css';

const Reviews = ({ reviewItems }) => {
  return (
      <div className="reviews">
          <h2 className="allReviewsTitle">Reviews (35)</h2>
          {reviewItems.map(review => (
              <ReviewItem 
              key={review.id}
              name={review.name}
              createdAt={review.createdAt}
              status={review.status}
              comment={review.review}
              rating={review.rating}
              />
          ))}
      </div>
  );
}



export default Reviews;
