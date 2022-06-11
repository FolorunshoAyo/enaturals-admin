import React from 'react';
import './Picture.css';
import {Close} from '@material-ui/icons';

const Picture = ({id, src, caption, tag, handleDelete}) => {
    return(
        <div className="galleryPhoto">
            <button className="closeBtn">
                <Close className="closeBtnIcon" onClick={handleDelete}/>
            </button>
            <div className="galleryPhotoContainer">
                <img src={src} alt={"gallery pics " + id} className="galleryPhotoImg"/>
                <div className="captionContainer">
                    <span className="captionText"><span>Caption:</span> {caption}</span>
                    <span className="imageTag"><span>Tag:</span> {tag}</span>
                </div>
            </div>
        </div>
    );
};



export default Picture;
