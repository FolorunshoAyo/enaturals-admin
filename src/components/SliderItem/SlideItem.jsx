import React from 'react';
import './SlideItem.css';
import { Edit, Delete} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const SlideItem = ({id, src, title, desc, handleDelete}) => {
    return (
        <div className="slideContent">
            <img src={src} alt={"slide pic " + id} className="slideImg"/>
            <div className="slideInfo">
                <h3 className="slideTitle">{title}</h3>
                <p className="slideDescription">{desc}</p>
                <div className="actionButtons">
                    <Link to={`/slide/${id}`} className="slideLink"> <Edit className="slideIcon editIcon"/> </Link>
                    <Delete className="slideIcon deleteIcon" onClick={handleDelete}/>
                </div>
            </div>
        </div>
    );
};



export default SlideItem;