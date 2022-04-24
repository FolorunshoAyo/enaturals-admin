import { Description, Publish, Title } from '@material-ui/icons';
import React from 'react';
import './Slide.css';

const Slide = () => {
    return (
        <div className="slide">
            <div className="pagination">
                Quick Menu &gt; Slides &gt; Slide 1
            </div>
            <h1 className="slideTitle">Edit Slide</h1>
            <div className="slideContainer">
               <div className="slideShow">
                   <div className="slideShowTop">
                       <img src="../enaturals/enaturals5.jpg" alt="slide" className="slideShowImg" />
                       <div className="slideShowTopTitle">
                           <span className="slideShowslidename">Title of slide</span>
                           <span className="slideShowTitle">desc of slide</span>
                       </div>
                   </div>
                   <div className="slideShowBottom">
                       <span className="slideShowTitle">Title</span>
                       <div className="slideShowInfo">
                            <Title className="slideShowIcon"/>
                            <span className="slideShowInfoTitle">Title of slide</span>
                       </div>
                       <span className="slideShowTitle">Description of slide</span>
                       <div className="slideShowInfo">
                            <Description className="slideShowIcon"/>
                            <span className="slideShowInfoTitle">Description</span>
                       </div>
                   </div>
               </div>
               <div className="slideUpdate">
                   <span className="slideUpdateTitle">Edit</span>
                   <form className="slideUpdateForm">
                       <div className="slideUpdateLeft">
                           <div className="slideUpdateItem">
                               <label>Title</label>
                               <input type="text" placeholder="Title of slide" className="slideUpdateInput"/>
                           </div>
                           <div className="slideUpdateItem">
                               <label>Description</label>
                               <input type="text" placeholder="Desc of slide (MAX: 150 characters)" maxLength="150" className="slideUpdateInput"/>
                           </div>
                       </div>
                       <div className="slideUpdateRight">
                           <div className="slideUpdateUpload">
                               <img src="../enaturals/enaturals5.jpg" alt="" className="slideUpdateImg" />
                               <label htmlFor="file"><Publish className="slideUpdateIcon"/> </label>
                               <input type="file" id="file" style={{ display: "none" }}/>
                           </div>
                           <button className="slideUpdateButton">Update</button>
                       </div>
                   </form>
               </div>
            </div>
        </div>
    );
};



export default Slide;