import React from "react";
import Avatar from './avatar.png';
import "./CommentAndReply.css";


const Replies = ({name, email, reply, status}) => {

    const colorStatus = (currStatus) => {
        return <span className={"replyStatus " + currStatus}>{currStatus}</span>;
    };

  const renderReplyActions = (status) => {
    switch (status) {
      case "pending":
        return (
          <div className="replyActionFormGroup">
            <button className="replyActionBtn">Publish</button>
            <button className="replyActionBtn">Delete</button>
          </div>
        );
        break;
      case "published":
        return (
          <div className="replyActionFormGroup">
            <button className="replyActionBtn">Unpublish</button>
            <button className="replyActionBtn">Delete</button>
          </div>
        );
        break;
      case "declined":
        return (
          <div className="replyActionFormGroup">
            <button className="replyActionBtn">Delete</button>
          </div>
        );
        break;
      default:
        console.log("No other actions");
    }
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
                <form className="replyActionForm">
                {renderReplyActions(status)}
                </form>
            </div>
        </div>
    );
};



export default Replies;