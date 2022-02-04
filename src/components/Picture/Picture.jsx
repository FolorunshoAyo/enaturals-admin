import React from 'react';
import './Picture.css';
import {Close} from '@material-ui/icons';

const Picture = ({id, src, caption, handleDelete}) => {
    return(
        <div className="galleryPhoto">
            <button className="closeBtn">
                <Close className="closeBtnIcon" onClick={handleDelete}/>
            </button>
            <div className="galleryPhotoContainer">
                <img src={src} alt={"gallery pics " + id} className="galleryPhotoImg"/>
                <div className="captionContainer">
                    <span className="captionText">{caption}</span>
                </div>
            </div>
        </div>
    );
};



export default Picture;
