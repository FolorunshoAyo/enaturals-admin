import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { KeyboardArrowDown, Add} from '@material-ui/icons';
// import { testimonialItems } from '../../data';
import TestimonialItem from '../../components/TestimonialItem/TestimonialItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getTestimonials, deleteTestimonial, addTestimonial } from '../../redux/apiCalls';
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

const Testimonials = () => {
    const [formStatus, setFormStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const testimonials = useSelector(state => state.testimonials.testimonials);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
  
    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    useEffect(() => {
        getTestimonials(dispatch);
    }, [dispatch]);

    const toggleForm = () => {
        setFormStatus(!formStatus);
    };

    const actionDeleteTestimonial = async (id) => {
        // For dummy data
        // setTestimonials(testimonials.filter(testimonials => testimonials.id !== id));
        if(testimonials.length === 1){
            toast.warning("You should have at least one testimonial on your list", toastSettings);
            return;
        }else{
            const testifier = testimonials.find(testimony => testimony._id === id).testifierName;
            
            const validateDelete = await confirm(`Are you sure you want to delete this testimonial by ${testifier}?`);

            if(validateDelete){
                deleteTestimonial(id, dispatch);
            }else{
                return; 
            }    
        }
    };

    const onSubmit = (data) => {
        setLoading(true);
        const fileName = `IMG-${new Date().getTime()}-enaturals-testimonial-` + data.testifierImg[0].name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, data.testifierImg[0]);

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
                const testimonialItem = {...data, testifierImg: downloadURL};
                addTestimonial(testimonialItem, dispatch);
                reset();
                setFormStatus(false);
                setLoading(false);
            });
            }
        );
    };

    return(
        <div className="testimonials">
            <div className="pagination">
                Quick Menu &gt; Testimonials
            </div>
            <div className="testimonialsContentInfo">
            {   
                (testimonials.length === 0)? 
                <div className="emptyTestimonialsMsgContainer">
                    <p className="emptyTestimonialsMsg">There is no Testimonial to display.</p>
                    <p className="emptyTestimonialCaption">Click the plus sign below to add a new slide</p>
                </div>
                :
                testimonials.map(testimonial => (
                    <TestimonialItem 
                    key={testimonial._id}
                    id={testimonial._id}
                    src={testimonial.testifierImg}
                    name={testimonial.testifierName}
                    testimony={testimonial.testimony}
                    handleDelete={() => actionDeleteTestimonial(testimonial._id)}
                    />
                ))
                }
            </div>
            <div className={`addTestimonialsContainer ${formStatus? 'opened' : ''}`}>
                <button className="addTestimonialsButton" onClick={toggleForm}>
                    {formStatus? <KeyboardArrowDown className="addTestimonialsIcon" /> : <Add className="addTestimonialsIcon"/>}
                </button>
                <div className="addTestimonialsFormContainer">
                    <h2 className="addTestimonialsFormTitle">Upload Testimonial</h2>
                    <form className="addTestimonialsForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="addTestimonialsFormBox">
                            <div className="addTestimonialsFormGroup">
                                <label>Testimonial Image</label>
                                <input {...register("testifierImg", {required: "You need to upload a file"})} type="file" id="file"/>
                                {errors.testifierImg && <p className="error">{errors.testifierImg.message}</p>}
                            </div>
                            <div className="addTestimonialsFormGroup">
                                <label>Testifier</label>
                                <input {...register("testifierName", { required: "Please provide a title" })} type="text" placeholder="Add a Name"/>
                                {errors.testifierName && <p className="error">{errors.testifierName.message}</p>}
                            </div>
                            <div className="addTestimonialsFormGroup">
                                <label>Testimony</label>
                                <input {...register("testimony", { required: "Please provide a description" })} type="text" placeholder="Add a caption"/>
                                {errors.testimony && <p className="error">{errors.testimony.message}</p>}
                            </div>
                        </div>      
                        <button className="testimonialsFormUploadButton" disabled={loading}>{loading? <CircularProgress size="2rem" className="loader" /> : "Upload"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}



export default Testimonials;