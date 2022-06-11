import React, { useState } from "react";
import "./AddressSlider.css";
import { addresses } from "../../data";
import UserAddress from "../UserAddress/UserAddress";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

const AddressSlider = () => {
    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== addresses.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === addresses.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(addresses.length)
        }
    }

    return (
        <div className="addressList">
            {addresses.map((address, index) => {
                return (
                    <div className={slideIndex === index + 1 ? "slide active-anim" : "slide"} key={address.id}>
                        <div className="slideCount">
                            {`${slideIndex} / ${addresses.length}`}
                        </div>
                        <UserAddress 
                            firstName={address.firstname}
                            lastName={address.lastname}
                            phoneNo={address.phoneNo}
                            addPhoneNo={address.addPhoneNo}
                            additionalInfo={address.additionalInfo}
                            address={address.address}
                            region={address.region}
                            city={address.city}
                            isDefault={address.isDefault}
                        />
                        <div className="sliderBtnContainer">
                            <button onClick={prevSlide} className="sliderBtn addressSliderPrevious">{<ArrowBack className="arrowIcon"/>}</button>
                            <button onClick={nextSlide} className="sliderBtn addressSliderNext">{<ArrowForward className="arrowIcon"/>}</button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};




export default AddressSlider;