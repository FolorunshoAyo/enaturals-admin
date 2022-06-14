import React from "react";
import { deleteReply, updateReply } from "../../redux/apiCalls";
import Avatar from './avatar.png';
import "./CommentAndReply.css";
import { confirm } from "react-confirm-box";
import { useDispatch } from "react-redux";

const Replies = ({replyID, name, email, reply, status, commentNo, commentID}) => {
  const dispatch = useDispatch();

  const colorStatus = (currStatus) => {
      return <span className={"replyStatus " + currStatus}>{currStatus}</span>;
  };

  const handleUpdate = async (newStatus) => {
    if(newStatus !== "delete"){
      updateReply(replyID, commentID, commentNo, {status: newStatus}, dispatch);
    }else{
      const validateDelete = await confirm("Are you sure you want to delete this reply?");
  
      if(validateDelete){
        deleteReply(replyID, commentNo, dispatch);
      }
    }
  }

  const renderReplyActions = (status) => {
    let rendered = "";

    switch (status) {
      case "pending":
        rendered =  <div className="replyActionFormGroup">
                      <button className="replyActionBtn" onClick={() => handleUpdate("published")}>Publish</button>
                      <button className="replyActionBtn" onClick={() => handleUpdate("delete")}>Delete</button>
                    </div>
        break;
      case "published":
        rendered =  <div className="replyActionFormGroup">
                      <button className="replyActionBtn" onClick={() => handleUpdate("pending")}>Unpublish</button>
                      <button className="replyActionBtn" onClick={() => handleUpdate("delete")}>Delete</button>
                    </div>
        break;
      default:
        console.log("No other actions");
    }

    return rendered;
  };

    return (
        <div className="replyContainer">
            <div className="replyImg">
                <img src={Avatar} alt="avatar" />
            </div>
            <div className="replyDetailsContainer">
                <div className="replyDetails">
                    <span className="replyName">{name}</span>
                    <span className="replyEmail">{email}</span>
                </div>
                <span className="reply">{reply}</span>
            </div>
            <div className="replyStatusAndAction">
                {colorStatus(status)}
                <div className="replyActionForm">
                {renderReplyActions(status)}
                </div>
            </div>
        </div>
    );
};



export default Replies;