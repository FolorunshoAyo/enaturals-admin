import React from 'react';
import './Video.css';
import { Delete } from '@material-ui/icons';
import ReactPlayer from 'react-player';

const Video = ({id, src, caption, handleDelete}) => {
    return(
        <div className="galleryVideo">
            <div className="galleryVideoContainer">
                <ReactPlayer url={src} controls width="100%"/>
            </div>
            <div className="videoInfo">
                <span className="videoCaption">{caption + " " + id}</span>
                <Delete className="videoIcon" onClick={handleDelete}/>
            </div>
        </div>
    );
};



export default Video;