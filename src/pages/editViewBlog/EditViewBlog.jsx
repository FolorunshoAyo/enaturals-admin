import React from 'react';
import "./EditViewBlog.css";
import { Link, useLocation, useParams } from 'react-router-dom';
import { AccessTime, ArrowBackIos, CalendarTodayOutlined, Edit, RemoveRedEyeOutlined, Save } from '@material-ui/icons';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}



const EditViewBlog = () => {
    // For Get Request Query Parameters
    const query = useQuery();
    const action = query.get("action");

    //For Router Params
    const params =  useParams();
    const blogId = params.blogId;

    return(
        <>
            {action === "view"? 
            <div className="blogContainer">
                <div className="viewBlogContainer">
                    <span className="blogViewLabel">Title</span>
                    <div className="viewBlogTitleContainer">
                        <h2 className="viewBlogTitle">Making the world a better place</h2>
                        <div className="blogViewActions">
                            <button className="viewActionBtn">
                                <Link to={`/blog/${blogId}?action=edit`} className="blogActionLink">
                                    <Edit className="viewActionIcon"/> 
                                    Edit
                                </Link>
                            </button>
                            <button className="viewActionBtn">
                                <Link to="/blogs" className="blogActionLink">
                                    <ArrowBackIos className="viewActionIcon"/> 
                                    Back
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="blogViewDetails">
                    <div className="blogViewContentContainer">
                        <div className="blogViewGroup blogInfoBlock">
                            <span className="blogLabel">Text</span>
                            <div className="blogContent">
                                {/* Content Here */}
                                My name is Folorunsho, I am a student of Babcock Univesity which is located at ilishan-remo, Ogun state, Nigeria.
                                It is very nice to know that I am capable of making things work out as they should. I am striving to be the best at
                                using various web development stacks to build lovely applications 
                            </div>
                        </div>
                        <div className="blogViewGroup blogInfoBlock">
                            <span className="blogLabel">Image &amp; Caption</span>
                            <div className="blogImgContainer">
                                <img src="../enaturals/enaturals5.jpg" alt="#" className="blogImg"/>
                                <span className="blogImgCaption"><span>Caption:</span> Some caption</span>
                            </div>
                        </div>

                        <div className="blogViewGroup blogInfoBlock">
                            <span className="blogLabel">Blog Comments</span>
                            <div className="blogComments">
                                {/* All comments come here */}
                                Still working on it
                            </div>
                        </div>
                    </div>
                    <div className="blogMetaContainer">
                        <div className="blogViewGroup">
                            <span className="blogLabel">Author</span>
                            <div className="blogAuthor">
                                <img src="../enaturals/enaturals5.jpg" alt="author profile" className="blogAuthorImg" />
                                <span className="blogAuthorName">Tijani Abmibola</span>
                            </div>
                        </div>

                        <div className="blogViewGroup">
                            <span className="blogLabel">Post date</span>
                            <div className="dateInfoContainer">
                                <div className="dateInfo">
                                    02/12/2019
                                    <CalendarTodayOutlined />
                                </div>
                                <div className="timeInfo">
                                    16:00
                                    <AccessTime />
                                </div>
                            </div>
                        </div>

                        <div className="blogViewGroup">
                            <span className="blogLabel">Category(s)</span>
                            <ul className="blogCategories">
                                <li className="blogCategory">Natural Soap</li>
                                <li className="blogCategory">Oils</li>
                                <li className="blogCategory">Research</li>
                                <li className="blogCategory">Skin Care</li>
                                <li className="blogCategory">Soap Making</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div> 
            : 
            <div className="blogContainer">
                <form className="editBlog">
                    <div className="blogEditTitleContainer">
                        <div className="blogEditTitle">
                            <label htmlFor="blogTitle">Title</label>
                            <input type="text" value="Making the World a Better Place" id="blogTitle" className="blogTitleInput"/>
                        </div>
                        <div className="saveBlogActionContainer">
                            <button className="editActionBtn">
                                <Link to={`/blog/${blogId}?action=view`} className="blogActionLink">
                                    <RemoveRedEyeOutlined className="editActionIcon"/> 
                                    View
                                </Link>
                            </button>
                            <button type="submit" className="editActionBtn submitBtn">
                                <Save className="editActionIcon"/> 
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="blogEditContainer">
                        <div className="blogEditContent">
                            <div className="blogEditGroup">
                                <label htmlFor="blogContent" className="blogLabel">
                                    Content
                                </label>
                                <textarea id="blogContent" placeholder="Enter text here ..."></textarea>
                            </div>

                            <div className="blogEditGroup">
                                <label htmlFor="blogImgUpload" className="blogLabel">
                                    Image
                                </label>
                                <input type="file" id="blogImgUpload" />
                            </div>
                        </div>
                        <div className="blogEditMetaContainer">
                            <div className="blogEditGroup">
                                <label htmlFor="authorName" className="blogLabel">Author</label>
                                <input type="text" className="authorInput" id="authorName"/>
                            </div>

                            <div className="blogEditGroup">
                                <label htmlFor="date" className="blogLabel">Category</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            }
        </>
    );
};



export default EditViewBlog;