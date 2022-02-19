import React from "react";
import BlogPost from "../BlogPost/BlogPost";

const BlogPosts = ({ posts }) => {
    return(
        <div className="blogPosts">
            {posts.map(post => (
            <BlogPost
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                updatedTime={post.updateTime}
            />
            ))}
        </div>
    );
};


export default BlogPosts;

