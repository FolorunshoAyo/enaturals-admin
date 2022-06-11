import React, { useEffect } from 'react';
import './ViewUser.css';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid } from '@material-ui/icons';
import { Link, useNavigate  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddressSlider from '../../components/AddressSlider/AddressSlider';
import UserOrders from '../../components/UserOrders/UserOrders';

const ViewUser = () => {
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
  
    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    return (
        <div className="user">
            <div className="pagination">
                Quick Menu &gt; <Link to="/users" className="paginationLink">User List</Link> &gt; User
            </div>
           <div className="userTitleContainer">
               <h1 className="userTitle">View User</h1>
               <Link to="/newUser">
                    <button className="userAddButton">Create</button>
               </Link>
           </div>
           <div className="viewUserContainer">
               <div className="viewUserShow">
                   <div className="userShowTop">
                       <img src="../enaturals/enaturals5.jpg" alt="User" className="userShowImg" />
                       <div className="userShowTopTitle">
                           <span className="userShowUsername">Folumania</span>
                           <span className="userShowFullName">Shodiya Folorunsho</span>
                       </div>
                   </div>
                   <div className="userShowBottom">
                       <span className="userShowTitle">Account Details</span>
                       <div className="userShowInfo">
                            <PermIdentity className="userShowIcon"/>
                            <span className="userShowInfoTitle">Male</span>
                       </div>
                       <div className="userShowInfo">
                            <CalendarToday className="userShowIcon"/>
                            <span className="userShowInfoTitle">None</span>
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
               <div className="userAddressList">
                   <span className="userTitle">Addresses</span>

                   <div className="userAddressListDetails">
                       <AddressSlider />
                   </div>
               </div>

               <div className="userOrderList">
                <span className="userTitle">Orders</span>

                <div className="userOrderDetails">
                    <UserOrders />
                </div>
               </div>
           </div>
        </div>
    );
}



export default ViewUser;