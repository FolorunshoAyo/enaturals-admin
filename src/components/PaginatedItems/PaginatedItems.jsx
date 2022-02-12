import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Reviews from '../Reviews/Reviews';
import { productReviews } from '../../data';
import './PaginatedItems.css';

const PaginatedItems = ({ itemsPerPage }) => {
  const [reviewItems, setCurrentItems] = useState(productReviews);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(productReviews.slice(itemOffset, endOffset));
    console.log(`startOffset: ${itemOffset}, endOffset: ${endOffset}`);
    setPageCount(Math.ceil(productReviews.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productReviews.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Reviews reviewItems={reviewItems} />
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
  );
}


export default PaginatedItems;