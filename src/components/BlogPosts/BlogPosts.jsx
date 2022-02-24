import React from "react";
import BlogPost from "../BlogPost/BlogPost";

const BlogPosts = ({ posts, handleDelete}) => {
    return(
        <div className="blogPosts">
            {posts.map(post => (
            <BlogPost
                key={post.id}
                id={post.id}
                title={post.title}
                image={post.photo}
                content={post.content}
                updatedTime={post.updateTime}
                handleDelete={handleDelete}
            />
            ))}
        </div>
    );
};


export default BlogPosts;

