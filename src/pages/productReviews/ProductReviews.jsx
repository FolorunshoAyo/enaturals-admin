import { Search, StarBorder } from '@material-ui/icons';
import React, { useEffect } from 'react';
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker';
import PaginatedItems from '../../components/PaginatedItems/PaginatedItems';
import "./ProductReviews.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductReviews = () => {
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
  
    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    const stars = (no) => {
        return [...Array(no)];
    }

    return (
        <div className="product-reviews">
            <div className="productReviewContainer">
                <div className="searchBarAndFilterBox">
                    <div className="searchBoxContainer">
                        <input type="text" className="searchBox"/>
                        <button className="searchButton">
                            <Search className="searchIcon"/>
                        </button>
                    </div>
                    <div className="reviewFilterFormContainer">
                        <form className="reviewFilterForm">
                            <div className="reviewFilterFormGroup">
                                <label>Date Range</label>
                                <div className="dateRangeContainer">
                                    <DateRangePicker placeholder="Enter Date Range"/>
                                </div>
                            </div>
                            <div className="reviewFilterFormGroup">
                                <label>Status</label>
                                <div className="statusContainer">
                                    <label htmlFor="radio1" className="statusBtn active">
                                        All
                                        <input type="radio" id="radio1" name="status" value="all" className="statusInput"/>
                                    </label>
                                    <label htmlFor="radio2" className="statusBtn">
                                        Published
                                        <input type="radio" id="radio2" name="status" value="published" className="statusInput"/>
                                    </label>
                                    <label htmlFor="radio3" className="statusBtn">
                                        Pending
                                        <input type="radio" id="radio3" name="status" value="Pending" className="statusInput"/>
                                    </label>
                                    <label htmlFor="radio4" className="statusBtn">
                                        Decline
                                        <input type="radio" id="radio4" name="status" value="decline" className="statusInput"/>
                                    </label>
                                </div>
                            </div>
                            <div className="reviewFilterFormGroup">
                                <label>Star Rating</label>
                                <div className="starRatingContainer">
                                    <div className="starRatingFormGroup">
                                        <input type="checkbox" name="rating" value="5" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                                return(
                                                    i + 1 <= 5? <StarBorder key={i + 1} className="starIcons coloredStarIcons"/> : <StarBorder className="starIcons uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="checkbox" name="rating" value="4" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                               return(
                                                    i + 1 <= 4? <StarBorder key={i + 1} className="starIcons coloredStarIcons"/> : <StarBorder className="starIcons uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="checkbox" name="rating" value="3" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                                return(
                                                    i + 1 <= 3? <StarBorder key={i + 1} className="starIcons coloredStarIcons"/> : <StarBorder className="starIcons uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="checkbox" name="rating" value="2" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                                return(
                                                    i + 1 <= 2? <StarBorder key={i + 1} className="starIcons coloredStarIcons"/> : <StarBorder className="starIcons uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="checkbox" name="rating" value="1" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                                return(
                                                    i + 1 === 1? <StarBorder key={i + 1} className="starIcons coloredStarIcons"/> : <StarBorder className="starIcons uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="reviewFilterFormBtn">Filter</button>
                        </form>
                    </div>
                </div>
                <div className="allReviewsContainer">
                    <PaginatedItems itemsPerPage={10}/>
                </div>
            </div>
        </div>
    );
};



export default ProductReviews;