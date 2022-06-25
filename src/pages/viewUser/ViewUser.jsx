import React, { useEffect } from 'react';
import './ViewUser.css';
import { CalendarToday, MailOutline, PermIdentity, PhoneAndroid } from '@material-ui/icons';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddressSlider from '../../components/AddressSlider/AddressSlider';
import UserOrders from '../../components/UserOrders/UserOrders';
import { getUsers } from '../../redux/apiCalls';

const ViewUser = () => {
    const { pathname } = useLocation();
    const userID = pathname.split("/")[3];
    const user = useSelector(state => state.users.users.find(user => user._id === userID));
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(() => {
        if(adminUser === null){
            navigate("/");
        }
    }, [adminUser, navigate]);

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

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
                       <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="User" className="userShowImg" />
                       <div className="userShowTopTitle">
                           <span className="userShowUsername">{user.username}</span>
                           <span className="userShowFullName">{`${user.lastname} ${user.firstname}`}</span>
                       </div>
                   </div>
                   <div className="userShowBottom">
                       <span className="userShowTitle">Account Details</span>
                       <div className="userShowInfo">
                            <PermIdentity className="userShowIcon"/>
                            <span className="userShowInfoTitle">{user.gender}</span>
                       </div>
                       <div className="userShowInfo">
                            <CalendarToday className="userShowIcon"/>
                            <span className="userShowInfoTitle">{user.dob === ""? "Not provided" : user.dob}</span>
                       </div>
                       <span className="userShowTitle">Contact Details</span>
                       <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon"/>
                            <span className="userShowInfoTitle">{user.phoneno}</span>
                       </div>
                       <div className="userShowInfo">
                            <MailOutline className="userShowIcon"/>
                            <span className="userShowInfoTitle">{user.email}</span>
                       </div>
                   </div>
               </div>
               <div className="userAddressList">
                   <span className="userTitle">Addresses</span>

                   <div className="userAddressListDetails">
                       <AddressSlider userID={userID}/>
                   </div>
               </div>

               <div className="userOrderList">
                <span className="userTitle">Orders</span>

                <div className="userOrderDetails">
                    <UserOrders userID={userID}/>
                </div>
               </div>
           </div>
        </div>
    );
}



export default ViewUser;