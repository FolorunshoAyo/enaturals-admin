import React from 'react';
import './TestimonialItem.css';
import { Edit, Delete} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const TestimonialItem = ({id, src, name, testimony, handleDelete}) => {
    return (
        <div className="testimonialContent">
            <img src={src} alt="testifier" className="testimonialImg"/>
            <div className="testimonialInfo">
                <h3 className="testimonialTitle">{name}</h3>
                <p className="testimonialDescription">{testimony}</p>
                <div className="actionButtons">
                    <Link to={`/testimonial/${id}`} className="testimonialLink"> <Edit className="testimonialIcon editIcon"/> </Link>
                    <Delete className="testimonialIcon deleteIcon" onClick={handleDelete}/>
                </div>
            </div>
        </div>
    );
};



export default TestimonialItem;