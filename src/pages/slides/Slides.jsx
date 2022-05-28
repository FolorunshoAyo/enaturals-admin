import React, { useState, useEffect } from 'react';
import './Slides.css';
import { KeyboardArrowDown, Add} from '@material-ui/icons';
import { sliderItems } from '../../data';
import SlideItem from '../../components/SliderItem/SlideItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Slider = () => {
    const [formStatus, setFormStatus] = useState(false);
    const [slides, setSlides] = useState(sliderItems);
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

    const deleteSlide = id => {
        setSlides(slides.filter(slider => slider.id !== id));
    };

    return(
        <div className="slider">
            <div className="pagination">
                Quick Menu &gt; Slides
            </div>
            <div className="sliderContentInfo">
                {slides.map(slide => (
                    <SlideItem 
                    key={slide.id}
                    id={slide.id}
                    src={slide.img}
                    title={slide.title}
                    desc={slide.desc}
                    handleDelete={() => deleteSlide(slide.id)}
                    />
                ))}
            </div>
            <div className={`addSliderContainer ${formStatus? 'opened' : ''}`}>
                <button className="addSliderButton" onClick={() => toggleForm(!formStatus)}>
                    {formStatus? <KeyboardArrowDown className="addSliderIcon" /> : <Add className="addSliderIcon"/>}
                </button>
                <div className="addSliderFormContainer">
                    <h2 className="addSliderFormTitle">Upload Slider</h2>
                    <form className="addSliderForm">
                        <div className="addSliderFormBox">
                            <div className="addSliderFormGroup">
                                <label>Slider Image</label>
                                <input type="file" id="file"/>
                            </div>
                            <div className="addSliderFormGroup">
                                <label>Title</label>
                                <input type="text" placeholder="Add a Title"/>
                            </div>
                            <div className="addSliderFormGroup">
                                <label>Desc</label>
                                <input type="text" placeholder="Add a Description"/>
                            </div>
                        </div>      
                        <button className="sliderFormUploadButton">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    );
}



export default Slider;