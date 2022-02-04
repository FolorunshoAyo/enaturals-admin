import { CalendarToday, Search } from '@material-ui/icons';
import React from 'reeact';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const ProductReviews = () => {
    const stars = (no) => {
        return [...Array(no)];
    }

    return (
        <div className="product-reviews">
            <div className="productReviewContainer">
                <div className="searchBarAndFilterBox">
                    <div className="searchBoxContainer">
                        <input type="text" className="searchBox"/>
                        <button className="searchButton"><Search /></button>
                    </div>
                    <div className="reviewFilterFormContainer">
                        <form className="reviewFilterForm">
                            <div className="reviewFilterFormGroup">
                                <label>Date Range</label>
                                <div className="dateRangeContainer">
                                    <div className="dateIcon">
                                        <CalendarToday />
                                    </div>
                                    <input type="date"/>
                                </div>
                            </div>
                            <div className="reviewFilterFormGroup">
                                <label>Status</label>
                                <div className="statusContainer">
                                    <label htmlFor="radio1" className="statusBtn">
                                        All
                                        <input type="radio" id="radio1" name="status" value="all"/>
                                    </label>
                                    <label htmlFor="radio2" className="statusBtn">
                                        Published
                                        <input type="radio" id="radio2" name="status" value="published"/>
                                    </label>
                                    <label htmlFor="radio3" className="statusBtn">
                                        Published
                                        <input type="radio" id="radio3" name="status" value="Pending"/>
                                    </label>
                                    <label htmlFor="radio4" className="statusBtn">
                                        Decline
                                        <input type="radio" id="radio4" name="status" value="decline"/>
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
                                                    i <= 5? <StarBorderIcon className="coloredStarIcons"/> : <StarBorderIcon className="uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="checkbox" name="rating" value="4" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                               return(
                                                    i <= 4? <StarBorderIcon className="coloredStarIcons"/> : <StarBorderIcon className="uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="checkbox" name="rating" value="3" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                                return(
                                                    i <= 3? <StarBorderIcon className="coloredStarIcons"/> : <StarBorderIcon className="uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="checkbox" name="rating" value="2" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                                return(
                                                    i <= 2? <StarBorderIcon className="coloredStarIcons"/> : <StarBorderIcon className="uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="checkbox" name="rating" value="1" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                                return(
                                                    i === 1? <StarBorderIcon className="coloredStarIcons"/> : <StarBorderIcon className="uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="reviewFilterFormGroup">
                                <button type="submit" className="reviewFilterFormBtn">Filter</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="allReviewsContainer">
                    <h2 className="allReviewsTitle">Reviews(35)</h2>
                    
                </div>
            </div>
        </div>
    );
};



export default ProductReviews;