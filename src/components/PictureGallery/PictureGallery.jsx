import React, {useState, useEffect} from 'react';
import './PictureGallery.css';
import {Add, KeyboardArrowDown} from '@material-ui/icons';
// import { galleryPictures } from '../../data';
import Picture from '../Picture/Picture';
import { addPicture, deletePicture, getPictures } from '../../redux/apiCalls';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgress } from '@mui/material';
import { confirm } from 'react-confirm-box';
import { toast } from 'react-toastify';

const toastSettings = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};


const PictureGallery = () => {
    const [formStatus, setFormStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const pictures = useSelector(state => state.pictures.pictures);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        getPictures(dispatch);
    }, [dispatch]);

    const toggleForm = (status) => {
        setFormStatus(status);
    };

    const actionDeletePicture = async (id) => {
        // For dummy data
        // setPictures(pictures.filter(picture => picture.id !== id));
        if(pictures.length === 1){
            toast.warning("You should have at least one picture on your list", toastSettings);
            return;
        }else{
            const picture = pictures.find(picture => picture._id === id).tag;
            
            const validateDelete = await confirm(`Are you sure you want to delete this picture with tag ${picture.tag}?`);

            if(validateDelete){
                deletePicture(id, dispatch);
            }else{
                return; 
            }    
        }
    };

    const onSubmit = (data) => {
        setLoading(true);
        const fileName = `IMG-${new Date().getTime()}-enaturals-picture-` + data.picture[0].name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, data.picture[0]);

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
                const pictureItem = {...data, picture: downloadURL};
                addPicture(pictureItem, dispatch);
                reset();
                setFormStatus(false);
                setLoading(false);
            });
            }
        );
    };

    return (
        <div className="gallery">
            <div className={`galleryPhotos ${pictures.length === 0? "empty" : ""}`}>
                {
                    (pictures.length === 0)? 
                    <div className="emptyPicturesMsgContainer">
                        <p className="emptyPicturesMsg">There is no Picture to display.</p>
                        <p className="emptyPictureCaption">Click the plus sign below to add a new slide</p>
                    </div>
                    :
                    pictures.map(picture => (
                        <Picture 
                            key={picture._id}
                            id={picture._id}
                            src={picture.picture}
                            caption={picture.caption}
                            tag={picture.tag}
                            handleDelete={() => actionDeletePicture(picture._id)}
                        />
                    ))
                }
            </div>
            <div className={`addImageContainer ${formStatus? 'opened' : ''}`}>
                <button className="addImageButton" onClick={() => toggleForm(!formStatus)}>
                    {formStatus? <KeyboardArrowDown className="addImageIcon" /> : <Add className="addImageIcon"/>}
                </button>
                <div className="addImageFormContainer">
                    <h2 className="addImageFormTitle">Upload Image</h2>
                    <form className="addImageForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="addImageFormBox">
                            <div className="addImageFormGroup">
                                <label>Image</label>
                                <input {...register("picture", {required: "You need to upload a file"})} type="file" id="file"/>
                                {errors.picture && <p className="error">{errors.picture.message}</p>}
                            </div>
                            <div className="addImageFormGroup">
                                <label>Caption</label>
                                <input {...register("caption", { required: "Please provide a caption" })} type="text" placeholder="Add a Caption"/>
                                {errors.caption && <p className="error">{errors.caption.message}</p>}
                            </div>
                            <div className="addImageFormGroup">
                                <label>Tag</label>
                                <select {...register("tag", { required: "Please provide a tag" })} id="category" className="addImageSelect">
                                    <option value="">Select Tag</option>
                                    <option value="skin care">Skin Care</option>
                                    <option value="results">Results</option>
                                </select>
                                {errors.tag && <p className="error">{errors.tag.message}</p>}
                            </div>
                        </div>      
                        <button type="submit" className="imageFormUploadButton" disabled={loading}>{loading? <CircularProgress size="2rem" className="loader" /> : "Upload"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}



export default PictureGallery;