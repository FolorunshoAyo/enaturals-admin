import React from 'react';
import { StarBorder } from '@material-ui/icons';
import './Rating.css';

const Rating = ({rating}) => {
    return (
        <div className="starRating">
            {[...Array(5)].map((star, i) => {
                return (
                    rating >= i + 1? 
                    <StarBorder className="ratingIcon filledIcon" /> 
                    :
                    <StarBorder className="ratingIcon"/>
                )
            })
            }
        </div>
    );
};


export default Rating;