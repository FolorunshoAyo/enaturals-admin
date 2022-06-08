import React from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Reviews.css';

const Reviews = ({ reviewItems }) => {
  return (
      <div className="reviews">
          <h2 className="allReviewsTitle">Reviews ({reviewItems.length})</h2>
          {reviewItems.map(review => (
              <ReviewItem 
              key={review._id}
              reviewID={review._id}
              fullname={review.fullname}
              createdAt={review.createdAt}
              status={review.status}
              comment={review.review}
              rating={review.rating}
              productImg={review.productImg}
              productID={review.ProductID}
              />
          ))}
      </div>
  );
}



export default Reviews;
