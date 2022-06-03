import React, { useState } from 'react';
// import Avatar from './avatar.png';
import Rating from '../Rating/Rating';
import { Link } from 'react-router-dom';
import './ReviewItem.css';

const  ReviewItem = ({ name, createdAt, status, comment, rating}) => {

    const colorStatus = (currStatus) => {
        return <span className={"reviewStatus " + currStatus}>{currStatus}</span>;
    };

    const reviewActions = (status) => {
        switch (status){
            case "pending":
                return (
                    <div className="reviewActionFormGroup">
                        <button className="reviewActionBtn">Publish</button>
                        <button className="reviewActionBtn">Delete</button>
                    </div>
                );
                break;
                case "published":
                    return (
                        <div className="reviewActionFormGroup">
                            <button className="reviewActionBtn">Unpublish</button>
                            <button className="reviewActionBtn">Delete</button>
                        </div>
                    );
                    break;
                    case "declined":
                        return (
                            <div className="reviewActionFormGroup">
                                <button className="reviewActionBtn">Delete</button>
                            </div>
                        );
                        break;
                        default: 
                        console.log("No other actions");           
        }
    };

  return (
    <>
    <div className="review">
        <div className="avatarImgContainer">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="#" className="avatarImg"/>
        </div>
        <div className="reviewDetails">
            <span className="reviewersName">{name}</span>
            <span className="reviewDate">{createdAt}</span>
            <span className="reviewStatus">Status: {colorStatus(status)}</span>
            <span className="reviewComment">{comment}</span>
            <div className="reviewActions">
                <form className="reviewActionForm">
                    {reviewActions(status)}
                </form>
            </div>
        </div>
        <div className="ratingContainer">
            <Rating rating={rating}/>
            <div className="commentedProduct">
                <Link to="/product/1" className="productLink">
                    <img src="../enaturals/enaturals5.jpg" alt="product reviewed"/>
                </Link>
            </div>
        </div>
    </div>
    </>
  );
}



export default ReviewItem;