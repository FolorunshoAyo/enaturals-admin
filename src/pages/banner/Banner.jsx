import React, {useState, useRef, useEffect} from 'react';
import './Banner.css';
import { bannerInfo } from '../../data';
import NewArrivalDetails from '../../components/NewArrival/NewArrivalDetails';
import NewArrivalForm from '../../components/NewArrival/NewArrivalForm';
import InformationalDetails from '../../components/Informational/InformatinalDetails';
import InformationalForm from '../../components/Informational/InformationalForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Banner = () => {
    const tag = bannerInfo.tag;
    const [selectedDisplay, setSelectedDisplay] = useState("new arrival");
    const selectRef = useRef();
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
  
    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    const selectChangeHandler = () => {
        const selected = selectRef.current.value;

        setSelectedDisplay(selected);
    };

    return (
        <div className="banner">
            <div className="pagination">
                Quick Menu &gt; Banner
            </div>
            <div className="currentDisplayContainer">
                <h1 className="currentDisplayTitle">Current Display</h1>
                <div className="currentDisplay">
                    {tag === "new arrival"? <NewArrivalDetails {...bannerInfo}/> : <InformationalDetails {...bannerInfo} />}
                </div>
            </div>
            <div className="selectType">
                <h1 className="selectTypeTitle">Upload To Banner</h1>
                <div className="selectDisplayType">
                    <label>Display Type</label>
                    <select ref={selectRef} name="displayType" id="displayType" onChange={selectChangeHandler}>
                        <option value="new arrival">New Arrival</option>
                        <option value="informational">Informational</option>
                    </select>
                </div>
            </div>
            
            <div className="bannerContainer">
                {selectedDisplay === "new arrival"? <NewArrivalForm /> : <InformationalForm />}
            </div>
        </div>
    );
}



export default Banner;