import React from 'react';
// import Avatar from './avatar.png';
import Rating from '../Rating/Rating';
import { Link } from 'react-router-dom';
import './ReviewItem.css';
import { userRequest } from '../../requestMethod';
import { toast } from 'react-toastify';
import { confirm } from 'react-confirm-box';


const toastSettings = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
}
const  ReviewItem = ({ reviewID, fullname, createdAt, status, comment, rating, productImg, productID}) => {
    const createdAtDate = new Date(createdAt);

    const convertedDate = createdAtDate.toDateString();

    const handleReviewStatus = (status) => {
        const updateReview = async () => {
            try{
                await userRequest.put(`/productReview/${reviewID}`, {status: status});
                toast.success("Review updated successfully", toastSettings);
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            }catch(err){
                toast.error("Review update failed. Please check your connection and try again", toastSettings);
            }
        };

        updateReview();
    };

    const handleDeleteReview = () => {
        const deleteReview = async () => {
            try{
                const validateDelete = await confirm(`Are you sure you want to delete the review made by ${fullname}?`);
        
                if(validateDelete){
                    await userRequest.delete(`/productReview/${reviewID}`);
                    toast.success("Review deleted successfully.", toastSettings);
                    setTimeout(() => {
                        window.location.reload();
                    }, 4000);
                }else{
                    return;
                }
            }catch(err){
                toast.error("Review deletion failed. Please check your connection and try again.", toastSettings);
            }
        };

        deleteReview()
    }

    const colorStatus = (currStatus) => {
        return <span className={"reviewStatus " + currStatus}>{currStatus}</span>;
    };

    const reviewActions = (status) => {
        let result = "";
        switch (status){
            case "pending":
                result = (
                    <div className="reviewActionFormGroup">
                        <button className="reviewActionBtn" onClick={() => handleReviewStatus("published")}>Publish</button>
                        <button className="reviewActionBtn" onClick={handleDeleteReview}>Delete</button>
                    </div>
                );
            break;
            case "published":
                result = (
                    <div className="reviewActionFormGroup">
                        <button className="reviewActionBtn" onClick={() => handleReviewStatus("pending")}>Unpublish</button>
                        <button className="reviewActionBtn" onClick={handleDeleteReview}>Delete</button>
                    </div>
                );
            break;
            default: 
            console.log("No other actions");           
        }

        return result;
    };

  return (
    <>
    <div className="review">
        <div className="avatarImgContainer">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="#" className="avatarImg"/>
        </div>
        <div className="reviewDetails">
            <span className="reviewersName">{fullname}</span>
            <span className="reviewDate">{convertedDate}</span>
            <span className="reviewStatus">Status: {colorStatus(status)}</span>
            <span className="reviewComment">{comment}</span>
            <div className="reviewActions">
                <div className="reviewActionForm">
                    {reviewActions(status)}
                </div>
            </div>
        </div>
        <div className="ratingContainer">
            <Rating rating={rating}/>
            <div className="commentedProduct">
                <Link to={`/product/${productID}`} className="productLink">
                    <img src={productImg} alt="product reviewed"/>
                </Link>
            </div>
        </div>
    </div>
    </>
  );
}



export default ReviewItem;