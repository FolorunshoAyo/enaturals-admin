import { Search, StarBorder } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker';
import PaginatedItems from '../../components/PaginatedItems/PaginatedItems';
import "./ProductReviews.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../../requestMethod';
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

const toastSettings = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

const ProductReviews = () => {
    const [searchLoader, setSearchLoader] = useState(false);
    const [productReviews, setProductReviews] = useState([]); 
    const [selectedStatus, setSelectedStatus] = useState("");

    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
  
    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    useEffect(() => {
        const getProductReviews = async () => {
          try{
            const res =  await userRequest.get("/productReview/");
            setProductReviews(res.data);
          }catch(err){
            toast.error("Unable to fetch product reviews", toastSettings);
          }
        }
    
        getProductReviews();
      }, []);

    const stars = (no) => {
        return [...Array(no)];
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const searchInput = event.target[0].value;

        const searchProductReviews = async () => {
            try{
                setSearchLoader(true);
                const res =  await userRequest.get(`/productReview/search?q=${searchInput}`);
                setProductReviews(res.data);
                setSearchLoader(false);
            }catch(err){
                toast.error(err.response.data, toastSettings);
            }
        };

        searchProductReviews();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let searchParams = {};
        const dateRangeEntries = [];
        let query = "";
        let count = 1;

        for (let [key, value] of formData.entries()) {
            if(key === "ej2-datetimepicker_0"){
                dateRangeEntries.push(value);
            }else{
                searchParams = {...searchParams, [key]: value};
            }
        }

        dateRangeEntries.forEach((date, i) => {
            if(i === 0){
                searchParams = {...searchParams, startDate: date};
            }
            if(i === 1){
                searchParams = {...searchParams, endDate: date};
            }
        });

        for(const key in searchParams){
            if(count !== Object.keys(searchParams).length){
                query += `${key}=${searchParams[key]}&`
            }else{
                query += `${key}=${searchParams[key]}`
            }

            count += 1;
        }

        const filterReviews = async () => {
            try{
                const res = await userRequest.get(`/productReview/filter?${query}`);
                setProductReviews(res.data);
            }catch(err){
                toast.error(err.response.data, toastSettings);
            }
        };

        filterReviews();
    };

    const setClickedRadio = (statusSelected) => {
        setSelectedStatus(statusSelected);
    };

    return (
        <div className="product-reviews">
            <div className="productReviewContainer">
                <div className="searchBarAndFilterBox">
                    <form className="searchBoxContainer" onSubmit={handleSearch}>
                        <input type="text" placeholder="Search..." className="searchBox" />
                        <button type="submit" className="searchButton">
                            {searchLoader? <CircularProgress className="searchLoader"/> : <Search className="searchIcon"/>}
                        </button>
                    </form>
                    <div className="reviewFilterFormContainer">
                        <form className="reviewFilterForm" onSubmit={handleSubmit}>
                            <div className="reviewFilterFormGroup">
                                <label>Date Range</label>
                                <div className="dateRangeContainer">
                                    <DateRangePicker placeholder="Enter Date Range"/>
                                </div>
                            </div>
                            <div className="reviewFilterFormGroup">
                                <label>Status</label>
                                <div className="statusContainer">
                                    <label htmlFor="radio1" className={`statusBtn ${selectedStatus === "published"? "active" : ""}`} onClick={() => setClickedRadio("published")}>
                                        Published
                                        <input type="radio" id="radio1" name="status" value="published" className="statusInput"/>
                                    </label>
                                    <label htmlFor="radio2" className={`statusBtn ${selectedStatus === "pending"? "active" : ""}`} onClick={() => setClickedRadio("pending")}>
                                        Pending
                                        <input type="radio" id="radio2" name="status" value="pending" className="statusInput"/>
                                    </label>
                                </div>
                            </div>
                            <div className="reviewFilterFormGroup">
                                <label>Star Rating</label>
                                <div className="starRatingContainer">
                                    <div className="starRatingFormGroup">
                                        <input type="radio" name="rating" value="5" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                                return(
                                                    i + 1 <= 5? <StarBorder key={uuidv4()} className="starIcons coloredStarIcons"/> : <StarBorder className="starIcons uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="radio" name="rating" value="4" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                               return(
                                                    i + 1 <= 4? <StarBorder key={uuidv4()} className="starIcons coloredStarIcons"/> : <StarBorder className="starIcons uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="radio" name="rating" value="3" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                                return(
                                                    i + 1 <= 3? <StarBorder key={uuidv4()} className="starIcons coloredStarIcons"/> : <StarBorder className="starIcons uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="radio" name="rating" value="2" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                                return(
                                                    i + 1 <= 2? <StarBorder key={uuidv4()} className="starIcons coloredStarIcons"/> : <StarBorder className="starIcons uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="starRatingFormGroup">
                                        <input type="radio" name="rating" value="1" />
                                        <div className="starRatings">
                                            {stars(5).map((star, i) => {
                                                return(
                                                    i + 1 === 1? <StarBorder key={uuidv4()} className="starIcons coloredStarIcons"/> : <StarBorder className="starIcons uncloloredStarIcons"/>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="reviewFilterFormBtn">Filter</button>
                            <button type="reset" className="reviewFilterFormBtn">Reset</button>
                        </form>
                    </div>
                </div>
                <div className="allReviewsContainer">
                    <PaginatedItems itemsPerPage={10} productReviews={productReviews} />
                </div>
            </div>
        </div>
    );
};



export default ProductReviews;