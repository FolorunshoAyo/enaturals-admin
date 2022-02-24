import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { blogPosts } from '../../data';
import './AllBlogPosts.css';
import BlogPosts from '../BlogPosts/BlogPosts';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

const AllBlogPosts = ({ itemsPerPage }) => {
  const [posts, setCurrentItems] = useState(blogPosts);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(blogPosts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(blogPosts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogPosts.length;
    setItemOffset(newOffset);
  };

  const handleDelete = id => {
    console.log(id);
    // Process delete here
    // setCurrentItems(blogPosts.filter(blogPost => blogPost.id !== id).slice(itemOffset, itemOffset + itemsPerPage));
    // console.log(blogPosts, posts);
  };

  return (
    <div className="blogWrapper">
        <BlogPosts posts={posts} handleDelete={handleDelete}/>
        <div className="paginationContainer">
            <ReactPaginate
            nextLabel={<ArrowForwardIos className="paginationIcon"/>}
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<ArrowBackIos className="paginationIcon"/>}
            containerClassName={'reviewPagination'}
            activeClassName={'active'}
            />
        </div>
    </div>
  );
}


export default AllBlogPosts;
