import React, { useState, useRef } from 'react';
import { Publish } from '@material-ui/icons';


const NewArrivalForm = () => {
    const [displayDisInput, setDisplayDisInput] = useState(false);
    const discountSelect = useRef();

    const discountSelectHandler = () => {
        const isDiscounted = discountSelect.current.value; 
        setDisplayDisInput(isDiscounted === "yes"? true : false);
    };

    return (
        <div className="newBanner">
            <div className="newBannerImgSample">
                <img src="../enaturals/new-arrival-sample.png" alt="new Banner pic" className="imgSample"/>
            </div>
            <div className="newBannerFormContainer">
                <form className="newBannerForm">
                    <div className="newBannerFormGroupContainer">
                        <div className="newBannerFormGroup">
                            <label>Product Name</label>
                            <input type="text" placeholder="e.g Whitening Oil"/>
                        </div>
                        <div className="newBannerFormGroup">
                            <label>Discount</label>
                            <select ref={discountSelect} name="discount" id="discount" onChange={discountSelectHandler}>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        <div className={`newBannerFormGroup ${displayDisInput? "show" : "hidden"}`}>
                            <label>Discount Amount</label>
                            <input type="number" placeholder="e.g 20"/>
                        </div>
                        <div className="newBannerFormGroup">
                            <label>Product Description</label>
                            <textarea name="description" id="description" className="newBannerTextArea">
                            </textarea>
                        </div>
                    </div>
                    <div className="newBannerImgUpload">
                        <div className="newBannerImgBox">
                            <img src="../enaturals/enaturals5.jpg" alt="#" className="imgUpload"/>
                            <label htmlFor="imgUpload">
                                <Publish className="imgUploadIcon"/>
                            </label>
                            <input type="file" name="bannerImg" id="imgUpload" style={{display: "none"}}/>
                        </div>
                        <button type="submit" className="newBannerUploadBtn">Upload</button>
                    </div>
                </form>
            </div>
        </div>

    );
};




export default NewArrivalForm;