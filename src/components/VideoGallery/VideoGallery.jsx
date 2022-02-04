import React, {useState} from 'react';
import './VideoGallery.css';
import { galleryVideos } from '../../data';
import {Add, KeyboardArrowDown} from '@material-ui/icons';
import Video from '../Video/Video';

const VideoGallery = () => {
    const [formStatus, setFormStatus] = useState(false);
    const [videos, setVideos] = useState(galleryVideos);

    const toggleForm = (status) => {
        setFormStatus(status);
    };

    const deleteVideo = id => {
        setVideos(videos.filter(video => video.id !== id));
    };

    return (
        <div className="gallery">
            <div className="galleryVideos">
                {videos.map(video => (
                    <Video 
                    key={video.id}
                    id={video.id}
                    src={video.video}
                    caption={video.caption}
                    handleDelete={() => deleteVideo(video.id)}
                    />
                ))}
            </div>
            <div className={`addVideoContainer ${formStatus? 'opened' : ''}`}>
                <button className="addVideoButton" onClick={() => toggleForm(!formStatus)}>
                    {formStatus? <KeyboardArrowDown className="addVideoIcon" /> : <Add className="addVideoIcon"/>}
                </button>
                <div className="addVideoFormContainer">
                    <h2 className="addVideoFormTitle">Upload Video</h2>
                    <form className="addVideoForm">
                        <div className="addVideoFormBox">
                            <div className="addVideoFormGroup">
                                <label>Video</label>
                                <input type="file" id="file"/>
                            </div>
                            <div className="addVideoFormGroup">
                                <label>Caption</label>
                                <input type="text" placeholder="Add a Caption"/>
                            </div>
                        </div>      
                        <button className="videoFormUploadButton">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    );
}



export default VideoGallery;