import React from 'react';
import { StarBorder } from '@material-ui/icons';
import './Rating.css';
import { v4 as uuidv4 } from 'uuid';

const Rating = ({rating}) => {
    return (
        <div className="starRating">
            {[...Array(5)].map((star, i) => {
                return (
                    rating >= i + 1? 
                    <StarBorder key={uuidv4()} className="ratingIcon filledIcon" /> 
                    :
                    <StarBorder key={uuidv4()} className="ratingIcon"/>
                )
            })
            }
        </div>
    );
};


export default Rating;