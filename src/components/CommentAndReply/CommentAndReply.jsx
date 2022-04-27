import React from "react";
import Comments from "./Comments";
import { blogPostComments } from "../../data";
import "./CommentAndReply.css";

const CommentAndReply = ({blogID}) => {
    const filteredBlogPostComments = blogPostComments.filter(blogComment => blogComment.postID === Number(blogID));

    return (
        <div className="allComments">
            {
                filteredBlogPostComments.map(blogComment => (
                    <Comments 
                        key={blogComment.id}
                        name={blogComment.name}
                        email={blogComment.email}
                        comment={blogComment.comment}
                        commentID={blogComment.id}
                        status={blogComment.status}
                    />
                ))
            }
        </div>
    );
};



export default CommentAndReply;
