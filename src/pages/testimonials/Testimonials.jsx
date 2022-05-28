import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { KeyboardArrowDown, Add} from '@material-ui/icons';
import { testimonialItems } from '../../data';
import TestimonialItem from '../../components/TestimonialItem/TestimonialItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Testimonials = () => {
    const [formStatus, setFormStatus] = useState(false);
    const [testimonials, setTestimonials] = useState(testimonialItems);
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
  
    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    const toggleForm = (status) => {
        setFormStatus(status);
    };

    const deleteTestimonials = id => {
        setTestimonials(testimonials.filter(testimonials => testimonials.id !== id));
    };

    return(
        <div className="testimonials">
            <div className="pagination">
                Quick Menu &gt; Testimonials
            </div>
            <div className="testimonialsContentInfo">
                {testimonials.map(testimonial => (
                    <TestimonialItem 
                    key={testimonial.id}
                    id={testimonial.id}
                    caption={testimonial.caption}
                    profile={testimonial.profile}
                    handleDelete={() => deleteTestimonials(testimonial.id)}
                    />
                ))}
            </div>
            <div className={`addTestimonialsContainer ${formStatus? 'opened' : ''}`}>
                <button className="addTestimonialsButton" onClick={() => toggleForm(!formStatus)}>
                    {formStatus? <KeyboardArrowDown className="addTestimonialsIcon" /> : <Add className="addTestimonialsIcon"/>}
                </button>
                <div className="addTestimonialsFormContainer">
                    <h2 className="addTestimonialsFormTitle">Upload Testimonial</h2>
                    <form className="addTestimonialsForm">
                        <div className="addTestimonialsFormBox">
                            <div className="addTestimonialsFormGroup">
                                <label>Testimonial Image</label>
                                <input type="file" id="file"/>
                            </div>
                            <div className="addTestimonialsFormGroup">
                                <label>Name</label>
                                <input type="text" placeholder="Add a Name"/>
                            </div>
                            <div className="addTestimonialsFormGroup">
                                <label>Caption</label>
                                <input type="text" placeholder="Add a caption"/>
                            </div>
                        </div>      
                        <button className="testimonialsFormUploadButton">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    );
}



export default Testimonials;