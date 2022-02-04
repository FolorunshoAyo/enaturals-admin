import React, {useState} from 'react';
import './PictureGallery.css';
import {Add, KeyboardArrowDown} from '@material-ui/icons';
import { galleryPictures } from '../../data';
import Picture from '../Picture/Picture';

const PictureGallery = () => {
    const [formStatus, setFormStatus] = useState(false);
    const [pictures, setPictures] = useState(galleryPictures);

    const toggleForm = (status) => {
        setFormStatus(status);
    };

    const deletePicture = id => {
        setPictures(pictures.filter(picture => picture.id !== id));
    };

    return (
        <div className="gallery">
            <div className="galleryPhotos">
                {pictures.map(picture => (
                    <Picture 
                    key={picture.id}
                    id={picture.id}
                    src={picture.img}
                    caption={picture.caption}
                    handleDelete={() => deletePicture(picture.id)}
                    />
                ))}
            </div>
            <div className={`addImageContainer ${formStatus? 'opened' : ''}`}>
                <button className="addImageButton" onClick={() => toggleForm(!formStatus)}>
                    {formStatus? <KeyboardArrowDown className="addImageIcon" /> : <Add className="addImageIcon"/>}
                </button>
                <div className="addImageFormContainer">
                    <h2 className="addImageFormTitle">Upload Image</h2>
                    <form className="addImageForm">
                        <div className="addImageFormBox">
                            <div className="addImageFormGroup">
                                <label>Image</label>
                                <input type="file" id="file"/>
                            </div>
                            <div className="addImageFormGroup">
                                <label>Caption</label>
                                <input type="text" placeholder="Add a Caption"/>
                            </div>
                            <div className="addImageFormGroup">
                                <label>Tag</label>
                                <select name="category" id="category" className="addImageSelect">
                                    <option value="natural soap">Natural Soap</option>
                                    <option value="results">Results</option>
                                </select>
                            </div>
                        </div>      
                        <button className="imageFormUploadButton">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    );
}



export default PictureGallery;