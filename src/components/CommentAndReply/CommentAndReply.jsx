import React, { useEffect } from "react";
import Comments from "./Comments";
// import { blogPostComments } from "../../data";
import "./CommentAndReply.css";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/apiCalls";

const CommentAndReply = ({ blogID }) => {
    // const filteredBlogPostComments = blogPostComments.filter(blogComment => blogComment.postID === Number(blogID));
    const comments = useSelector(state => state.comments.comments);
    const dispatch = useDispatch();

    useEffect(() => {
        getComments(blogID, dispatch);
    }, [blogID, dispatch]);
    
    return (
        <div className="allComments">
            {
                (comments.length === 0)?
                <div className="emptyCommentMsgContainer">
                    <p className="emptyCommentCaption">There are no Comments yet</p>
                </div>
                :
                comments.map((blogComment, index) => (
                    <Comments 
                        key={blogComment._id}
                        name={blogComment.name}
                        email={blogComment.email}
                        comment={blogComment.comment}
                        commentID={blogComment._id}
                        status={blogComment.status}
                        commentNo={index}
                    />
                ))
            }
        </div>
    );
};



export default CommentAndReply;
