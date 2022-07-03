import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
// import { blogPosts } from '../../data';
import './AllBlogPosts.css';
import BlogPosts from '../BlogPosts/BlogPosts';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { deleteBlog, getBlogs } from '../../redux/apiCalls';
import { useSelector } from 'react-redux';
import { confirm } from 'react-confirm-box';
import { toast } from 'react-toastify';

const toastSettings = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const AllBlogPosts = ({ itemsPerPage }) => {
  const blogs = useSelector(state => state.blogs.blogs);
  const dispatch = useDispatch();
  const [posts, setCurrentItems] = useState(blogs);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    getBlogs(dispatch);
  }, [dispatch]);


  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(blogs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(blogs.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, blogs]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.length;
    setItemOffset(newOffset);
  };

  const actionDeleteBlog = async (id) => {
    // For dummy data
    // setSlides(slides.filter(slider => slider.id !== id));
    if(blogs.length === 1){
        toast.warning("You should have at least one blog on your list", toastSettings);
        return;
    }else{
      const blog = blogs.find(blog => blog._id === id);

        const validateDelete = await confirm(`Are you sure you want to delete this blog written by ${blog.authorName}? (Doing this would delete all the replies and comments)`);

        if(validateDelete){
          deleteBlog(id, dispatch);
        }else{
          return; 
        }    
    }
  };

  return (
    <div className="blogWrapper">
      {   
        (blogs.length === 0)? 
        <div className="emptyBlogsMsgContainer">
          <p className="emptyBlogsMsg">There is no Blog to display.</p>
          <p className="emptyBlogCaption">Click the plus sign at the top right coner to add a new blog</p>
        </div>
        :
        <>
          <BlogPosts posts={posts} handleDelete={actionDeleteBlog}/>
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
        </>
      }
    </div>
  );
}


export default AllBlogPosts;
