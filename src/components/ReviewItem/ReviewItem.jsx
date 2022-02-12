import React, {useState, useRef} from 'react';
import Avatar from './avatar.png';
import Rating from '../Rating/Rating';
import './ReviewItem.css';

const  ReviewItem = ({ name, createdAt, status, comment, rating}) => {
    const [viewBtn, setViewBtn] = useState(false);

    console.log(viewBtn);
    
    const handleRadio = () => {
        setViewBtn(true);
    };

    const colorStatus = (currStatus) => {
        return <span className={"status " + currStatus}>{currStatus}</span>;
    };

    const reviewActions = (status) => {
        switch (status){
            case "pending":
                return (
                    <div className="reviewActionFormGroup">
                        <label htmlFor="unpublish" onClick={handleRadio}>
                            <input type="radio" name="reviewAction" id="unpublish" value="unpublish" />
                            Publish
                        </label>
                        <label htmlFor="delete" onClick={handleRadio}>
                            <input type="radio" name="reviewAction" id="delete" value="delete" />
                            Delete
                        </label>
                    </div>
                );
                break;
                case "published":
                    return (
                        <div className="reviewActionFormGroup">
                            <label htmlFor="unpublish" onClick={handleRadio}>
                                <input type="radio" name="reviewAction" id="unpublish" value="unpublish"/>
                                Unpublish
                            </label>
                            <label htmlFor="delete" onClick={handleRadio}>
                                <input type="radio" name="reviewAction" id="delete" value="delete"/>
                                Delete
                            </label>
                        </div>
                    );
                    break;
                    case "declined":
                        return (
                            <div className="reviewActionFormGroup">
                                <label htmlFor="delete" onClick={handleRadio}>
                                    <input type="radio" name="reviewAction" id="delete" value="delete"/>
                                    Delete
                                </label>
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
            <img src={Avatar} alt="#" className="avatarImg"/>
        </div>
        <div className="reviewDetails">
            <span className="reviewersName">{name}</span>
            <span className="reviewDate">{createdAt}</span>
            <span className="reviewStatus">Status: {colorStatus(status)}</span>
            <span className="reviewComment">{comment}</span>
            <div className="reviewActions">
                <form class="reviewActionForm">
                    {reviewActions(status)}
                    <button type="submit" className={`reviewActionBtn ${viewBtn? "show" : ""}`}>
                        Save
                    </button>
                </form>
            </div>
        </div>
        <div className="ratingContainer">
            <Rating rating={rating}/>
            <div className="commentedProduct">
                <img src="../enaturals/enaturals5.jpg" alt="product reviewed"/>
            </div>
        </div>
    </div>
    </>
  );
}



export default ReviewItem;