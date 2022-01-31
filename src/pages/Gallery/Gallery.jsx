import React from 'react';
import './Gallery.css';

const Gallery = () => {
    return(
        <div className="galleryContainer">
            <div className="pagination">
                Dashboard &gt; Gallery &gt; {/* Current Gallery */}
            </div>
            <div className="galleryTab">
                <button className="galleryTabBtn">Picture</button>
                <button className="galleryTabBtn">Video</button>
            </div>
        </div>
    );
};


export default Gallery;