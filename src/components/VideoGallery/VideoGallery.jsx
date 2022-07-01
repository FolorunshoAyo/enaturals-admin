import React, {useState, useEffect} from 'react';
import './VideoGallery.css';
// import { galleryVideos } from '../../data';
import {Add, KeyboardArrowDown} from '@material-ui/icons';
import Video from '../Video/Video';
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addVideo, deleteVideo, getVideos } from '../../redux/apiCalls';
import { CircularProgress } from '@mui/material';
import { confirm } from 'react-confirm-box';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';


const toastSettings = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

const VideoGallery = () => {
    const [formStatus, setFormStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const videos = useSelector(state => state.videos.videos);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();


    useEffect(() => {
        getVideos(dispatch);
    }, [dispatch]);

    const toggleForm = (status) => {
        setFormStatus(status);
    };

    const actionDeleteVideo = async (id) => {
        // For dummy data
        // setVideos(videos.filter(video => video.id !== id));
        if(videos.length === 1){
            toast.warning("You should have at least one video on your list", toastSettings);
            return;
        }else{
            const validateDelete = await confirm(`Are you sure you want to delete this video?`);

            if(validateDelete){
                deleteVideo(id, dispatch);
            }else{
                return; 
            }    
        }
    };

    const onSubmit = (data) => {
        setLoading(true);
        const fileName = `VID-${new Date().getTime()}-enaturals-video-` + data.video[0].name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, data.video[0]);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
            (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, 
            (error) => {
                toast.error(error, toastSettings);
            }, 
            () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const videoItem = {...data, video: downloadURL};
                addVideo(videoItem, dispatch);
                reset();
                setFormStatus(false);
                setLoading(false);
            });
            }
        );
    };

    return (
        <div className="gallery">
            <div className={`galleryVideos ${videos.length === 0? "empty" : ""}`}>
                {
                    (videos.length === 0)? 
                    <div className="emptyVideosMsgContainer">
                        <p className="emptyVideosMsg">There is no Video to display.</p>
                        <p className="emptyVideoCaption">Click the plus sign below to add a new video</p>
                    </div>
                    :
                    videos.map(video => (
                        <Video 
                        key={video._id}
                        src={video.video}
                        caption={video.caption}
                        handleDelete={() => actionDeleteVideo(video._id)}
                        />
                    ))
                }
            </div>
            <div className={`addVideoContainer ${formStatus? 'opened' : ''}`}>
                <button className="addVideoButton" onClick={() => toggleForm(!formStatus)}>
                    {formStatus? <KeyboardArrowDown className="addVideoIcon" /> : <Add className="addVideoIcon"/>}
                </button>
                <div className="addVideoFormContainer">
                    <h2 className="addVideoFormTitle">Upload Video</h2>
                    <form className="addVideoForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="addVideoFormBox">
                            <div className="addVideoFormGroup">
                                <label>Video</label>
                                <input {...register("video", {required: "You need to upload a file"})} type="file" id="file"/>
                                {errors.video && <p className="error">{errors.video.message}</p>}
                            </div>
                            <div className="addVideoFormGroup">
                                <label>Caption</label>
                                <input {...register("caption", {required: "Please provide a caption"})} type="text" placeholder="Add a Caption"/>
                                {errors.caption && <p className="error">{errors.caption.message}</p>}
                            </div>
                        </div>      
                        <button type="submit" className="videoFormUploadButton" disabled={loading}>{loading? <CircularProgress className="loader" /> : "Upload"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}



export default VideoGallery;