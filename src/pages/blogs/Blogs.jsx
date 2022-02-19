import { Add } from '@material-ui/icons';
import React from 'react';
import "./Blogs.css";
import AllBlogPosts from '../../components/AllBlogPosts/AllBlogPosts';
import { Link } from 'react-router-dom';

const Blogs = () => {
    return (
        <div className="blogs">
            <div className="pagination">
                Quick Menu &gt; My Blogs
            </div>
            <div className="blogTitleContainer">
                <h1 className="blogTitle">My Blogs</h1>
                <button className="blogAddBtn">
                    <Link to="/newUser" className="blogAddLink">
                        <Add className="blogAddIcon"/>
                        Add New Blog
                    </Link>
                </button>
            </div>
            <AllBlogPosts itemsPerPage={4} />
        </div>
    );
};



export default Blogs;