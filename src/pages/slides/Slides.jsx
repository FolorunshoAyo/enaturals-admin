import React, { useState, useEffect } from 'react';
import './Slides.css';
import { KeyboardArrowDown, Add} from '@material-ui/icons';
// import { sliderItems } from '../../data';
import SlideItem from '../../components/SliderItem/SlideItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import { getSlides, deleteSlide, addSlide } from '../../redux/apiCalls';
import { confirm } from 'react-confirm-box';
import { CircularProgress } from '@mui/material';

const toastSettings = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

const Slider = () => {
    const [formStatus, setFormStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const slides = useSelector(state => state.slides.slides);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    useEffect(() => {
        getSlides(dispatch);
    }, [dispatch]);


    const toggleForm = (status) => {
        setFormStatus(status);
    };

    const actionDeleteSlide = async (id) => {
        // For dummy data
        // setSlides(slides.filter(slider => slider.id !== id));
        if(slides.length === 1){
            toast.warning("You should have at least one slide on your list", toastSettings);
            return;
        }else{
            const validateDelete = await confirm(`Are you sure you want to delete this slide?`);

            if(validateDelete){
                deleteSlide(id, dispatch);
            }else{
                return; 
            }    
        }
    };

    const onSubmit = (data) => {
        setLoading(true);
        const fileName = `IMG-${new Date().getTime()}-enaturals-slide-` + data.slideImg[0].name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, data.slideImg[0]);

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
                const slideItem = {...data, slideImg: downloadURL};
                addSlide(slideItem, dispatch);
                reset();
                setFormStatus(false);
                setLoading(false);
            });
            }
        );
    };

    return(
        <div className="slider">
            <div className="pagination">
                Quick Menu &gt; Slides
            </div>
            <div className="sliderContentInfo">
                {   
                (slides.length === 0)? 
                <div className="emptySlidesMsgContainer">
                    <p className="emptySlideMsg">There is no Slide to display.</p>
                    <p className="emptySlideCaption">Click the plus sign below to add a new slide</p>
                </div>
                :
                slides.map(slide => (
                    <SlideItem 
                    key={slide._id}
                    id={slide._id}
                    src={slide.slideImg}
                    title={slide.title}
                    desc={slide.desc}
                    handleDelete={() => actionDeleteSlide(slide._id)}
                    />
                ))
                }
            </div>
            <div className={`addSliderContainer ${formStatus? 'opened' : ''}`}>
                <button className="addSliderButton" onClick={() => toggleForm(!formStatus)}>
                    {formStatus? <KeyboardArrowDown className="addSliderIcon" /> : <Add className="addSliderIcon"/>}
                </button>
                <div className="addSliderFormContainer">
                    <h2 className="addSliderFormTitle">Upload Slider</h2>
                    <form className="addSliderForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="addSliderFormBox">
                            <div className="addSliderFormGroup">
                                <label>Slider Image</label>
                                <input {...register("slideImg", {required: "You need to upload a file"})} type="file" id="file"/>
                                {errors.slideImg && <p className="error">{errors.slideImg.message}</p>}
                            </div>
                            <div className="addSliderFormGroup">
                                <label>Title</label>
                                <input {...register("title", { required: "Please provide a title" })} type="text" maxLength="50" placeholder="Add a Title" />
                                {errors.title && <p className="error">{errors.title.message}</p>}
                            </div>
                            <div className="addSliderFormGroup">
                                <label>Desc</label>
                                <input {...register("desc", { required: "Please provide a description" })} type="text" placeholder="Add a Description"/>
                                {errors.desc && <p className="error">{errors.desc.message}</p>}
                            </div>
                        </div>      
                        <button className="sliderFormUploadButton" disabled={loading}>{loading? <CircularProgress size="2rem" className="loader"/> : "Upload"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}



export default Slider;