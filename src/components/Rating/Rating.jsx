import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Rating = ({rating}) => {
    return (
        <div className="starRating">
            {[...Array(5)].map((star, i) => {
                return (
                    rating >= i + 1? 
                    <StarBorderIcon style={{color: '#B8A398', fontSize: 20}} /> 
                    :
                    <StarBorderIcon style={{fontSize: 20}}/>
                )
            })
            }
        </div>
    );
};


export default Rating;