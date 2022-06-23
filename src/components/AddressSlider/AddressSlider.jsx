import React, { useState } from "react";
import "./AddressSlider.css";
// import { addresses } from "../../data";
import UserAddress from "../UserAddress/UserAddress";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { useEffect } from "react";
import { publicRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";

const AddressSlider = ({ userID }) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading]  = useState(true);
    const [slideIndex, setSlideIndex] = useState(1)

    useEffect(() => {
        const getUserAddresses = async () => {
            try{
                setLoading(true);
                const res = await publicRequest.get(`/address/${userID}`);
                setAddresses(res.data);
                setLoading(false);
            }catch(error){
                toast.error("Unable to get user address (501)");
            }
        };

        getUserAddresses();
    }, []);

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
            {
                (loading)?
                <div className="progressWrapper">
                    <CircularProgress size="8rem" className="addressLoader"/>
                </div>
                :
                (addresses.length === 0)?
                <div className="noAddressError">
                    No Addresses yet
                </div>
                :
                addresses.map((address, index) => {
                    return (
                        <div className={slideIndex === index + 1 ? "addressSlide active-anim" : "addressSlide"} key={address._id}>
                            <div className="slideCount">
                                {`${slideIndex} / ${addresses.length}`}
                            </div>
                            <UserAddress 
                                firstName={address.firstName}
                                lastName={address.lastName}
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
                })
            }
        </div>
    );
};




export default AddressSlider;