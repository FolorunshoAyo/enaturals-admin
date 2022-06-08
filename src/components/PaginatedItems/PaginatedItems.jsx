import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Reviews from '../Reviews/Reviews';
// import { productReviews } from '../../data';
import './PaginatedItems.css';

const PaginatedItems = ({ itemsPerPage, productReviews }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(productReviews.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(productReviews.length / itemsPerPage));
  }, [productReviews, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productReviews.length;
    setItemOffset(newOffset);
  };

  return (
    <>
    {
      (productReviews.length === 0)?
      <div className="noReviewsMsgContainer">
        <span className="noReviewsMsg">No reviews to display</span>
        <span className="noReviewCaption">Try another making selction</span>
      </div>
      :
      <>
        <Reviews reviewItems={currentItems} />
        <div className="paginationContainer">
          <ReactPaginate
            nextLabel="next"
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="previous"
            containerClassName={'reviewPagination'}
            activeClassName={'active'}
          />
        </div>
      </>
    }
    </>
  );
}


export default PaginatedItems;