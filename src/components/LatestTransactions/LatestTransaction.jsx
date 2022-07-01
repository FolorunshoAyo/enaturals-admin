import { formatDistance } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import "./LatestTransactions.css";


const LatestTransaction = ({ userID, username, createdAt, amount, status }) => {
    const Status = ({status}) => {
        const statusUpdate = (status === "on the way")? "delivering" : status;
        return <span className={"widgetLgStatus " + statusUpdate}>{statusUpdate}</span>
    };

    return(
        <>
            <td className="widgetLgUser">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="User Identity" className="widgetLgImg" />
                <Link to={`/user/view/${userID}`} className="widgetLgName">
                   {username}
                </Link>
            </td>
            <td className="widgetLgDate">{formatDistance(new Date(createdAt), new Date()) + " ago"}</td>
            <td className="widgetLgAmount">₦{amount}</td>
            <td className="widgetLgStatus"><Status status={status} /></td>
        </>
    );
};



export default LatestTransaction;