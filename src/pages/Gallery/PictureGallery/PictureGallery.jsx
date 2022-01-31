import React, {useState} from 'react';
import './Gallery.css';
import {Add, Close, KeyboardArrowDown} from '@material-ui/icons';

const PictureGallery = () => {
    const [formStatus, setFormStatus] = useState(false);

    const toggleForm = (status) => {
        setFormStatus(status);
    };

    return (
        <div className="gallery">
            <div className="galleryPhotos">
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals-1.jpg" alt="gallery pics 1" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption One</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals3.jpg" alt="gallery pics 2" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Two</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals4.jpg" alt="gallery pics 3" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Three</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals5.jpg" alt="gallery pics 4" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Four</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals6.jpg" alt="gallery pics 5" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Five</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals7.jpg" alt="gallery pics 6" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Six</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals8.jpg" alt="gallery pics 7" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Seven</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals9.jpg" alt="gallery pics 8" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Eight</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals10.jpg" alt="gallery pics 9" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Nine</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals11.jpg" alt="gallery pics 10" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Eleven</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals12-stripped.png" alt="gallery pics 11" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Twelve</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals12.jpg" alt="gallery pics 12" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Thirteen</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/enaturals13.jpg" alt="gallery pics 13" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Fourteen</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/flutterwave-logo.jpeg" alt="gallery pics 14" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Fourteen</span>
                        </div>
                    </div>
                </div>
                <div className="galleryPhoto">
                    <button className="closeBtn">
                        <Close className="closeBtnIcon"/>
                    </button>
                    <div className="galleryPhotoContainer">
                        <img src="../enaturals/kit-1.jpg" alt="gallery pics 15" className="galleryPhotoImg"/>
                        <div className="captionContainer">
                            <span className="captionText">Caption Fifteen</span>
                        </div>
                    </div>
                </div>
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