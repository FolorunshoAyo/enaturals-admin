import React from 'react';
import { Publish } from '@material-ui/icons';


const InformationalForm = ({productName, discountedAmount, textSnippet, productImg}) => {
    return (
        <div className="newBanner">
            <div className="newBannerImgSample">
                <img src="../enaturals/enaturals5.jpg" alt="Banner pics" className="imgSample"/>
            </div>
            <div className="newBannerFormContainer">
                <form className="newBannerForm">
                    <div className="newBannerFormGroupContainer">
                        <div className="newBannerFormGroup">
                            <label>Tag</label>
                            <input type="text" placeholder="e.g Promo!!! or Sales!!!"/>
                        </div>
                        <div className="newBannerFormGroup">
                            <label>Title</label>
                            <input type="number" placeholder="e.g 20"/>
                        </div>
                        <div className="newBannerFormGroup">
                            <label>Description</label>
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




export default InformationalForm;