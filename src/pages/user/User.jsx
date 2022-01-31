import React from 'react';
import './User.css';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const User = () => {
    return (
        <div className="user">
            <div class="pagination">
                Quick Menu &gt; <Link to="/users" className="paginationLink">User List</Link> &gt; User 1
            </div>
           <div className="userTitleContainer">
               <h1 className="userTitle">Edit User</h1>
               <Link to="/newUser">
                    <button className="userAddButton">Create</button>
               </Link>
           </div>
           <div className="userContainer">
               <div className="userShow">
                   <div className="userShowTop">
                       <img src="../enaturals/enaturals5.jpg" alt="User" className="userShowImg" />
                       <div className="userShowTopTitle">
                           <span className="userShowUsername">Shodiya Folorunsho</span>
                           <span className="userShowTitle">Software Engineer</span>
                       </div>
                   </div>
                   <div className="userShowBottom">
                       <span className="userShowTitle">Account Details</span>
                       <div className="userShowInfo">
                            <PermIdentity className="userShowIcon"/>
                            <span className="userShowInfoTitle">folumania</span>
                       </div>
                       <div className="userShowInfo">
                            <CalendarToday className="userShowIcon"/>
                            <span className="userShowInfoTitle">10.12.1999</span>
                       </div>
                       <span className="userShowTitle">Contact Details</span>
                       <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon"/>
                            <span className="userShowInfoTitle">+234 70 878 571 41</span>
                       </div>
                       <div className="userShowInfo">
                            <MailOutline className="userShowIcon"/>
                            <span className="userShowInfoTitle">folushoayomide@gmail.com</span>
                       </div>
                       <div className="userShowInfo">
                            <LocationSearching className="userShowIcon"/>
                            <span className="userShowInfoTitle">Lagos State | Nigeria</span>
                       </div>
                   </div>
               </div>
               <div className="userUpdate">
                   <span className="userUpdateTitle">Edit</span>

                   <form className="userUpdateForm">
                       <div className="userUpdateLeft">
                           <div className="userUpdateItem">
                               <label>Username</label>
                               <input type="text" placeholder="folumania" className="userUpdateInput"/>
                           </div>
                           <div className="userUpdateItem">
                               <label>Full Name</label>
                               <input type="text" placeholder="Shodiya Folorunsho" className="userUpdateInput"/>
                           </div>
                           <div className="userUpdateItem">
                               <label>Email</label>
                               <input type="text" placeholder="folushoayomide11@gmail.com" className="userUpdateInput"/>
                           </div>
                           <div className="userUpdateItem">
                               <label>Phone</label>
                               <input type="text" placeholder="+234 70 878 571 41" className="userUpdateInput"/>
                           </div>
                           <div className="userUpdateItem">
                               <label>Address</label>
                               <input type="text" placeholder="Lagos State | Nigeria" className="userUpdateInput"/>
                           </div>
                       </div>
                       <div className="userUpdateRight">
                           <div className="userUpdateUpload">
                               <img src="../enaturals/enaturals5.jpg" alt="" className="userUpdateImg" />
                               <label htmlFor="file"><Publish className="userUpdateIcon"/> </label>
                               <input type="file" id="file" style={{ display: "none" }}/>
                           </div>
                           <button className="userUpdateButton">Update</button>
                       </div>
                   </form>
               </div>
           </div>
        </div>
    );
}



export default User;