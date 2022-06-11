import React from "react";
import { AccessAlarm, Delete, Edit, RemoveRedEye} from "@material-ui/icons";
import "./BlogPost.css";
import { Link } from "react-router-dom";

const BlogPost = ({id, title, image, content, updatedTime, handleDelete}) => {

    return (
        <div className="blogPost">
            <div className="blogDetailsContainer">
                <div className="blogImg">
                    <img src={image} alt="blog attachment" />
                </div>
                <div className="blogDetails">
                    <h2 className="blogTitle">{title}</h2>
                    <p className="blogTextSnippet" dangerouslySetInnerHTML={{__html: content.slice(0, 100) + "..."}}></p>
                    <div className="blogPostDate">
                        <span>
                            <AccessAlarm className="blogPostDateIcon"/>
                            {updatedTime.substr(0, 10)}
                        </span>
                        <div className="mobileBlogActions">
                            <Link to={`/blog/${id}?action=edit`} className="mobileBlogPostlink">
                                <span className="blogIconContainer">
                                    <Edit className="blogActionIcon"/>
                                </span>
                            </Link>
                            <Link to={`/blog/${id}?action=view`} className="mobileBlogPostlink">
                                <span className="blogIconContainer">
                                    <RemoveRedEye className="blogActionIcon"/>
                                </span>
                            </Link>
                            <div className="deleteBlogPost" onClick={() => handleDelete(id)}>
                                <span className="blogIconContainer">
                                    <Delete className="blogActionIcon"/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blogActions">
                    <button className="blogBtn">
                        <Link to={`/blog/${id}?action=edit`} className="blogPostlink">
                            <span className="blogIconContainer">
                                <Edit className="blogActionIcon"/>
                            </span>
                            Edit
                        </Link>
                    </button>
                    <button className="blogBtn">
                        <Link to={`/blog/${id}?action=view`} className="blogPostlink">
                            <span className="blogIconContainer">
                                <RemoveRedEye className="blogActionIcon"/>
                            </span>
                            View
                        </Link>
                    </button>
                    <button className="blogTrashBtn" onClick={() => handleDelete(id)}>
                        <span className="blogIconContainer">
                            <Delete className="blogActionIcon"/>
                        </span>
                        Trash                  
                    </button>
                </div>
            </div>
        </div>
    );
}; 



export default BlogPost;