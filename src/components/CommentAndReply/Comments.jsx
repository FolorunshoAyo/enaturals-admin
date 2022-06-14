import React, { useEffect } from "react";
import Replies from "./Replies";
import Avatar from "./avatar.png";
// import { blogPostReplies } from "../../data";
import "./CommentAndReply.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getReplies, updateComment } from "../../redux/apiCalls";
import { confirm } from "react-confirm-box";

const Comment = ({ name, email, comment, commentID, status, commentNo }) => {
  const replies = useSelector(state => state.replies.replies[commentNo]);
  const dispatch = useDispatch();

    useEffect(() => {
      getReplies(commentID, commentNo, dispatch);
    }, [commentID, commentNo, dispatch]);

  const colorStatus = (currStatus) => {
      return <span className={"commentStatus " + currStatus}>{currStatus}</span>;
  };

 const handleUpdate = async (newStatus) => {
  if(newStatus !== "delete"){
    updateComment(commentID, {status: newStatus}, dispatch);
  }else{
    if(replies){
      const validateDelete = await confirm("This would delete selected comment and its replies. Go ahead?");

      if(validateDelete){
        deleteComment(commentID, dispatch);
      }
    }
  }
 }
  
  const renderCommentActions = (status) => {
    let rendered = "";
    switch (status) {
      case "pending":
        rendered = <div className="commentActionFormGroup">
                      <button className="commentActionBtn" onClick={() => handleUpdate("published")}>Publish</button>
                      <button className="commentActionBtn" onClick={() => handleUpdate("delete")}>Delete</button>
                    </div>
        break;
      case "published":
        rendered =  <div className="commentActionFormGroup">
                      <button className="commentActionBtn" onClick={() => handleUpdate("pending")}>Unpublish</button>
                      <button className="commentActionBtn" onClick={() => handleUpdate("delete")}>Delete</button>
                    </div>
        break;
      default:
        console.log("No other actions");
    }

    return rendered;
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
            <div className="commentActionForm">
            {renderCommentActions(status)}
            </div>
        </div>
      </div>
      <div className="replies">
        {
          (replies === undefined)?
          ""
          :
          replies.map((blogReply) => (
            <Replies
              key={blogReply._id}
              replyID={blogReply._id}
              name={blogReply.name}
              email={blogReply.email}
              reply={blogReply.reply}
              status={blogReply.status}
              commentNo={commentNo}
              commentID={commentID}
            />
          ))
        }
      </div>
    </>
  );
};

export default Comment;
