import React from "react";
import BlogPost from "../BlogPost/BlogPost";

const BlogPosts = ({ posts, handleDelete}) => {
    return(
        <div className="blogPosts">
            {posts.map(post => (
            <BlogPost
                key={post._id}
                id={post._id}
                title={post.title}
                image={post.photo}
                content={post.content}
                updatedTime={post.updatedAt}
                handleDelete={handleDelete}
            />
            ))}
        </div>
    );
};


export default BlogPosts;

