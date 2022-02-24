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
                    <p className="blogTextSnippet">{content.slice(0, 400) + "..."}</p>
                    <p className="blogPostDate">
                        <AccessAlarm className="blogPostDateIcon"/>
                        {updatedTime}
                    </p>
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