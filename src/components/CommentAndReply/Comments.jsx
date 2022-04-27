import React from "react";
import Replies from "./Replies";
import Avatar from "./avatar.png";
import { blogPostReplies } from "../../data";
import "./CommentAndReply.css";

const Comment = ({ name, email, comment, commentID, status }) => {
  const filteredBlogPostReplies = blogPostReplies.filter(
    (blogReply) => blogReply.commentID === commentID
  );

    const colorStatus = (currStatus) => {
        return <span className={"commentStatus " + currStatus}>{currStatus}</span>;
    };

  const renderCommentActions = (status) => {
    switch (status) {
      case "pending":
        return (
          <div className="commentActionFormGroup">
            <button className="commentActionBtn">Publish</button>
            <button className="commentActionBtn">Delete</button>
          </div>
        );
        break;
      case "published":
        return (
          <div className="commentActionFormGroup">
            <button className="commentActionBtn">Unpublish</button>
            <button className="commentActionBtn">Delete</button>
          </div>
        );
        break;
      case "declined":
        return (
          <div className="commentActionFormGroup">
            <button className="commentActionBtn">Delete</button>
          </div>
        );
        break;
      default:
        console.log("No other actions");
    }
  };

  return (
    <>
      <div className="commentContainer">
        <div className="commentImg">
          <img src={Avatar} alt="avatar" />
        </div>
        <div className="commentDetailsContainer">
          <div className="commentDetails">
            <span className="commentName">{name}</span>
            <span className="commentEmail">{email}</span>
          </div>
          <span className="comment">{comment}</span>
        </div>
        <div className="commentStatusAndAction">
            {colorStatus(status)}
            <form className="commentActionForm">
            {renderCommentActions(status)}
            </form>
        </div>
      </div>
      <div className="replies">
        {filteredBlogPostReplies.map((blogReply) => (
          <Replies
            key={blogReply.id}
            name={blogReply.name}
            email={blogReply.email}
            reply={blogReply.reply}
            status={blogReply.status}
          />
        ))}
      </div>
    </>
  );
};

export default Comment;
