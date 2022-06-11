import React from 'react';
import './Video.css';
import { Delete } from '@material-ui/icons';
import ReactPlayer from 'react-player';

const Video = ({ src, caption, handleDelete}) => {
    return(
        <div className="galleryVideo">
            <div className="galleryVideoContainer">
                <ReactPlayer url={src} controls width="100%" light/>
            </div>
            <div className="videoInfo">
                <span className="videoCaption">{caption}</span>
                <Delete className="videoIcon" onClick={handleDelete}/>
            </div>
        </div>
    );
};



export default Video;