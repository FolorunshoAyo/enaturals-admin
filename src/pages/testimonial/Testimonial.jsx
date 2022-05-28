import { ClosedCaption, Publish } from '@material-ui/icons';
import React, {useEffect} from 'react';
import './Testimonial.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Testimonial = () => {
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
  
    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    return (
        <div className="testimonial">
            <div className="pagination">
                Quick Menu &gt; Testimonials &gt; Testimonial 1
            </div>
            <h1 className="testimonialTitle">Edit Testimonial</h1>
            <div className="testimonialContainer">
               <div className="testimonialShow">
                   <div className="testimonialShowTop">
                       <img src="../enaturals/enaturals5.jpg" alt="testimonial" className="testimonialShowImg" />
                       <div className="testimonialShowTopTitle">
                           <span className="testimonialShowName">Name of testifier</span>
                       </div>
                   </div>
                   <div className="testimonialShowBottom">
                       <span className="testimonialShowTitle">Caption of testifier</span>
                       <div className="testimonialShowInfo">
                            <ClosedCaption className="testimonialShowIcon"/>
                            <span className="testimonialShowInfoTitle">Caption</span>
                       </div>
                   </div>
               </div>
               <div className="testimonialUpdate">
                   <span className="testimonialUpdateTitle">Edit</span>
                   <form className="testimonialUpdateForm">
                       <div className="testimonialUpdateLeft">
                           <div className="testimonialUpdateItem">
                               <label>Name</label>
                               <input type="text" placeholder="Name of Testifier" className="testimonialUpdateInput"/>
                           </div>
                           <div className="testimonialUpdateItem">
                               <label>Caption</label>
                               <input type="text" placeholder="Comment of testifier" className="testimonialUpdateInput"/>
                           </div>
                       </div>
                       <div className="testimonialUpdateRight">
                           <div className="testimonialUpdateUpload">
                               <img src="../enaturals/enaturals5.jpg" alt="" className="testimonialUpdateImg" />
                               <label htmlFor="file"><Publish className="testimonialUpdateIcon"/> </label>
                               <input type="file" id="file" style={{ display: "none" }}/>
                           </div>
                           <button className="testimonialUpdateButton">Update</button>
                       </div>
                   </form>
               </div>
            </div>
        </div>
    );
}



export default Testimonial;