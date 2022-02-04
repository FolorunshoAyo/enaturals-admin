import React, {useState} from 'react';
import './Gallery.css';
import PictureGallery from '../../components/PictureGallery/PictureGallery';
import VideoGallery from '../../components/VideoGallery/VideoGallery';

const Gallery = () => {
    const [galleryType, setGalleryType] = useState("picture");


    const switchGallery = (type) => {
        setGalleryType(type);
    };

    return(
        <div className="galleryContainer">
            <div className="pagination">
                Dashboard &gt; Gallery &gt; {/* Current Gallery */}
            </div>
            <div className="galleryTab">
                <button className={`galleryTabBtn ${galleryType === "picture"? 'active' : ''}`} onClick={() => switchGallery("picture")}>Pictures</button>
                <button className={`galleryTabBtn ${galleryType === "video"? 'active' : ''}`} onClick={() => switchGallery("video")}>Videos</button>
            </div>
            {galleryType === "picture"? <PictureGallery /> : <VideoGallery />}
        </div>
    );
};


export default Gallery;