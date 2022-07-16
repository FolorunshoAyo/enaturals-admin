import { Publish } from '@material-ui/icons';
import React, {useState, useEffect} from 'react';
import './Testimonial.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateTestimonial } from '../../redux/apiCalls';
import { CircularProgress } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Testimonial = () => {
    const { pathname } = useLocation();
    const testimonialID = pathname.split("/")[2];
    const testimonial = useSelector(state => state.testimonials.testimonials.find(testimonial => testimonial._id === testimonialID));
    const [testimonialImgName, setTestimonialImgName] = useState(testimonial.testifierImg);
    const [testimonialImg, setTestimonialImg] = useState("");
    const [loading, setLoading] = useState(false);
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:{
            testifierName: testimonial.testifierName,
            testimony: testimonial.testimony
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
            console.log(e.target.files[0].type);
            setTestimonialImgName(e.target.files[0].name);
            setTestimonialImg(e.target.files[0]);
        }
    };

    const onSubmit = (data) => {
        const updatedTestimonial = data;

        if(testimonialImgName === testimonial.testifierImg){
            setLoading(true);

            console.log("updating other data asides image", updatedTestimonial);
            updateTestimonial(testimonialID, updatedTestimonial, dispatch);
            setTimeout(() => setLoading(false), 2000);

        }else{
            setLoading(true);
            console.log("updating other data with image");
            const fileName = `IMG-${new Date().getTime()}-enaturals-testimonial-` + testimonialImgName;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, testimonialImg);
        
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
                    const product = {testifierImg: downloadURL, updatedTestimonial};
                    updateTestimonial(testimonialID, product, dispatch);
                    setLoading(false);
                });
                }
            );
        }
    };

    return (
        <div className="testimonial">
            <div className="pagination">
                Quick Menu &gt; Testimonials &gt; Testimonial 1
            </div>
            <h1 className="testimonialTitle">Edit Testimonial</h1>
            <div className="testimonialContainer">
               <div className="testimonialShow">
                   <div className="testimonialShowTop">
                       <img src={testimonial.testifierImg} alt="testimonial" className="testimonialShowImg" />
                       <div className="testimonialShowTopTitle">
                           <span className="testimonialShowName">{testimonial.testifierName}</span>
                       </div>
                   </div>
                   <div className="testimonialShowBottom">
                       <span className="testimonialShowTitle">Caption of testifier</span>
                       <div className="testimonialShowInfo">
                            <span className="testimonialShowInfoTitle">{testimonial.testimony}</span>
                       </div>
                   </div>
               </div>
               <div className="testimonialUpdate">
                   <span className="testimonialUpdateTitle">Edit</span>
                   <form className="testimonialUpdateForm" onSubmit={handleSubmit(onSubmit)}>
                       <div className="testimonialUpdateLeft">
                           <div className="testimonialUpdateItem">
                               <label>Testifier Name</label>
                               <input {...register("testifierName", {required: "Please provide a name"})} type="text" placeholder="Name of Testifier" className="testimonialUpdateInput"/>
                               {errors.testifierName && <p className="error">{errors.testifierName.message}</p>}
                           </div>
                           <div className="testimonialUpdateItem">
                               <label>Testimony</label>
                               <textarea {...register("testimony", {required: "Please provide a testimony"})} placeholder="Comment of testifier" className="testimonialUpdateTextarea"></textarea>
                               {errors.testimony && <p className="error">{errors.testimony.message}</p>}
                           </div>
                       </div>
                       <div className="testimonialUpdateRight">
                           <div className="testimonialUpdateUpload">
                               <img src={testimonial.testifierImg} alt="" className="testimonialUpdateImg" />
                               <label htmlFor="file"><Publish className="testimonialUpdateIcon"/> </label>
                               <input type="file" id="file" onChange={handleFileChange} style={{ display: "none" }}/>
                           </div>
                           <button className="testimonialUpdateButton">{loading? <CircularProgress size="2rem" className="loader"/> : "Update"}</button>
                       </div>
                   </form>
               </div>
            </div>
        </div>
    );
}



export default Testimonial;