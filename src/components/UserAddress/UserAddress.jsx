import React from "react";
import "./UserAddress.css";

const UserAddress = ({firstName, lastName, phoneNo, addPhoneNo, additionalInfo, address, region, city, isDefault}) => {
    return (
        <div className="userAddress">
            <span className="recipientDetailsTitle">
                Recipient's Details
            </span>
            <div className="userAddressRecipientDetails">
                <div className="userAddressRecipientContainer">
                    <span className="recipientLabel">Name: </span>
                    <span className="recipientName">{`${lastName} ${firstName}`}</span>
                </div>
                <div className="userAddressRecipientContainer">
                    <span className="recipientLabel">Phone: </span>
                    <span className="recipientPhone">{phoneNo}</span>
                </div>
                <div className="userAddressRecipientContainer">
                    <span className="recipientLabel">Other Phone: </span>
                    <span className="recipientPhone">{addPhoneNo === ""? "None" : addPhoneNo}</span>
                </div>
                <div className="userAddressRecipientContainer shorten">
                    <span className="recipientLabel">Additional Information: </span>
                    <span className="recipientPhone">{additionalInfo === ""? "None" : additionalInfo}</span>
                </div>
                <div className="userAddressRecipientContainer shorten">
                    <span className="recipientLabel">Address: </span>
                    <span className="recipientAddress">{address}</span>
                </div>
                <div className="userAddressRecipientContainer">
                    <span className="recipientLabel">Region: </span>
                    <span className="recipientRegion">{region}</span>
                </div>
                <div className="userAddressRecipientContainer">
                    <span className="recipientLabel">City: </span>
                    <span className="recipientCity">{city}</span>
                </div>
            </div>
            <div className={`addressDefaultContainer ${isDefault? "show" : "hide"}`}>
                <div className="defaultBadge">
                    Default
                </div>
            </div>
        </div>
    );
};



export default UserAddress;