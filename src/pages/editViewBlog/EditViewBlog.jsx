import React, { useState } from 'react';
import "./EditViewBlog.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AccessTime, ArrowBackIos, CalendarTodayOutlined, Edit, RemoveRedEyeOutlined, Save } from '@material-ui/icons';
import CommentAndReply from '../../components/CommentAndReply/CommentAndReply';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}



const EditViewBlog = () => {
    // For Get Request Query Parameters
    const query = useQuery();
    const action = query.get("action");
    const [blogContent, setBlogContent] = useState('');

    //For Router Params
    const params =  useParams();
    const blogId = params.blogId;

    const handleChange = (value) => {
        setBlogContent(value);
    }


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
                            <span className="blogLabel">Blog Comments And Replies</span>
                            <div className="blogComments">
                                <CommentAndReply blogID={blogId}/>
                            </div>
                        </div>
                    </div>
                    <div className="blogMetaContainer">
                        <div className="blogViewGroup">
                            <span className="blogLabel">Author</span>
                            <div className="blogAuthor">
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
                            <div className="blogEditGroup blogEditBlock quillContainer">
                                <label htmlFor="blogContent" className="blogLabel">
                                    Content
                                </label>
                                <div className="editInputContainer">
                                <ReactQuill value={blogContent} onChange={handleChange} className="blogContentInput"/>
                                </div>
                            </div>

                            <div className="blogEditGroup blogEditBlock">
                                <label htmlFor="blogImgUpload" className="blogLabel">
                                    Image
                                </label>
                                <div className="editInputContainer">
                                    <input type="file" id="blogImgUpload" />
                                </div>
                            </div>
                        </div>
                        <div className="blogEditMetaContainer">
                            <div className="blogEditGroup">
                                <label htmlFor="authorName" className="blogLabel">Author</label>
                                <input type="text" value="Tijani Abimblola" className="authorInput" id="authorName"/>
                            </div>

                            <div className="blogEditGroup">
                                <label htmlFor="category" className="blogLabel">Category</label>
                                <select id="category" className="categorySelect">
                                    <option value="">Select a category</option>
                                    <option value="naturalSoap">Natural Soap</option>
                                    <option value="oils">Oils</option>
                                    <option value="research">Research</option>
                                    <option value="skinCare">Skin Care</option>
                                    <option value="soapMaking">Soap Making</option>
                                    <option value="spaProcedures">Spa Procedures</option>
                                </select>
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