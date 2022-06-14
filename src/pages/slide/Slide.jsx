import { Description, Publish, Title } from '@material-ui/icons';
import React, { useState ,useEffect } from 'react';
import './Slide.css';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateSlide } from '../../redux/apiCalls';
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgress } from '@mui/material';

const Slide = () => {
    const { pathname } = useLocation();
    const slideID = pathname.split("/")[2];
    const slide = useSelector(state => state.slides.slides.find(slide => slide._id === slideID));
    const [slideImgName, setSlideImgName] = useState(slide.slideImg);
    const [slideImg, setSlideImg] = useState("");
    const [loading, setLoading] = useState(false);
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:{
            title: slide.title,
            desc: slide.desc
        }
    });

    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    const handleFileChange = (e) => {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if(!allowedExtensions.exec(e.target.files[0].name)){
            alert("Invalid file type");
        }else{
            setSlideImgName(e.target.files[0].name);
            setSlideImg(e.target.files[0]);
        }
    };

    const onSubmit = (data) => {
        const updatedSlide = data;

        if(slideImgName === slide.slideImg){
            setLoading(true);

            console.log("updating other data asides image", updatedSlide);
            updateSlide(slideID, updatedSlide, dispatch);
            setTimeout(() => setLoading(false), 2000);

        }else{
            setLoading(true);
            console.log("updating other data with image");
            const fileName = `IMG-${new Date().getTime()}-enaturals-slide-` + slideImgName;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, slideImg);
        
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', 
                (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded        
                }, 
                (error) => {
                console.log(error);
                }, 
                () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const slide = {slideImg: downloadURL, updatedSlide};
                    updateSlide(slideID, slide, dispatch);
                    setLoading(false);
                });
                }
            );
        }
    };

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
                   <form className="slideUpdateForm" onSubmit={handleSubmit(onSubmit)}>
                       <div className="slideUpdateLeft">
                           <div className="slideUpdateItem">
                               <label>Title</label>
                               <input {...register("title", {required: "Please provide a title"})} type="text" placeholder="Title of slide" className="slideUpdateInput"/>
                               {errors.title && <p className="error">{errors.title.message}</p>}
                           </div>
                           <div className="slideUpdateItem">
                               <label>Description</label>
                               <textarea {...register("desc", {required: "Please provide a description"})} type="text" placeholder="Desc of slide (MAX: 150 characters)" maxLength="150" className="slideUpdateTextarea"></textarea>
                               {errors.desc && <p className="error">{errors.desc.message}</p>}
                           </div>
                       </div>
                       <div className="slideUpdateRight">
                           <div className="slideUpdateUpload">
                               <img src={slide.slideImg} alt="slide" className="slideUpdateImg" />
                               <label htmlFor="file"><Publish className="slideUpdateIcon"/> </label>
                               <input type="file" id="file" onChange={handleFileChange} style={{ display: "none" }}/>
                           </div>
                           <button className="slideUpdateButton">{loading? <CircularProgress size="2rem" className="loader" /> : "Update"}</button>
                       </div>
                   </form>
               </div>
            </div>
        </div>
    );
};



export default Slide;