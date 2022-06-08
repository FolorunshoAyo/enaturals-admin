import { Description, Publish, Title } from '@material-ui/icons';
import React, {useState, useEffect} from 'react';
import './Slide.css';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userRequest } from '../../requestMethod';

const toastSettings = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

const Slide = () => {
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const slideID = pathname.split("/")[2];
    const slide = useSelector(state => state.slides.slides.find(slide => slide._id === slideID));

    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    return (
        <div className="slide">
            <div className="pagination">
                Quick Menu &gt; Slides
            </div>
            <h1 className="slideTitle">Edit Slide</h1>
            <div className="slideContainer">
               <div className="slideShow">
                   <div className="slideShowTop">
                       <img src={slide.slideImg} alt="slide" className="slideShowImg" />
                       <div className="slideShowTopTitle">
                           <span className="slideShowslidename">{slide.title}</span>
                           <span className="slideShowTitle">{slide.desc}</span>
                       </div>
                   </div>
                   <div className="slideShowBottom">
                       <span className="slideShowTitle">Title</span>
                       <div className="slideShowInfo">
                            <Title className="slideShowIcon"/>
                            <span className="slideShowInfoTitle">{slide.title}</span>
                       </div>
                       <span className="slideShowTitle">Description of slide</span>
                       <div className="slideShowInfo">
                            <Description className="slideShowIcon"/>
                            <span className="slideShowInfoTitle">{slide.desc}</span>
                       </div>
                   </div>
               </div>
               <div className="slideUpdate">
                   <span className="slideUpdateTitle">Edit</span>
                   <form className="slideUpdateForm">
                       <div className="slideUpdateLeft">
                           <div className="slideUpdateItem">
                               <label>Title</label>
                               <input type="text" placeholder="Title of slide" value={slide.title} className="slideUpdateInput"/>
                           </div>
                           <div className="slideUpdateItem">
                               <label>Description</label>
                               <input type="text" placeholder="Desc of slide (MAX: 150 characters)" value={slide.desc} maxLength="150" className="slideUpdateInput"/>
                           </div>
                       </div>
                       <div className="slideUpdateRight">
                           <div className="slideUpdateUpload">
                               <img src={slide.slideImg} alt="slide" className="slideUpdateImg" />
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