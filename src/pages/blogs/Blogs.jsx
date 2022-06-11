import { Add } from '@material-ui/icons';
import React, {useEffect} from 'react';
import "./Blogs.css";
import AllBlogPosts from '../../components/AllBlogPosts/AllBlogPosts';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Blogs = () => {
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
    

    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);


    return (
        <div className="blogs">
            <div className="pagination">
                Quick Menu &gt; My Blogs
            </div>
            <div className="blogTitleContainer">
                <h1>My Blogs</h1>
                <button className="blogAddBtn">
                    <Link to="/newBlog" className="blogAddLink">
                        <Add className="blogAddIcon"/>
                        <span>Add New Blog</span>
                    </Link>
                </button>
            </div>
            <AllBlogPosts itemsPerPage={4} />
        </div>
    );
};



export default Blogs;