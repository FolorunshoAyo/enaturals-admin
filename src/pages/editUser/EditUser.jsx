import React, { useState, useEffect } from 'react';
import './EditUser.css';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid } from '@material-ui/icons';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import DatePicker from "react-datepicker";
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/apiCalls';

const User = () => {
    const { pathname } = useLocation();
    const userID = pathname.split("/")[3];
    const [phoneErr, setPhoneErr] = useState("");
    const [loading, setLoading] = useState("");
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const user = useSelector(state => state.users.users.find(user => user._id === userID));
    const [dateOfBirth, setDateOfBirth] = useState(new Date(user.dob === ""? "" : user.dob));
    const [phoneNo, setPhoneNo] = useState(user.phoneno);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender === ""? "" : user.gender,
            phoneno: user.phoneno
        }
    });

    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    const onSubmit = (data) => {
        if(phoneNo === undefined){
            setPhoneErr("Please input a phone number");
            return;
        }else{
            setPhoneErr("");

            setLoading(true);
            updateUser(userID, {...data, phoneno: phoneNo, dob: dateOfBirth.toISOString().substring(0, 10)}, dispatch);

            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    };

    return (
        <div className="user">
            <div className="pagination">
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
               <div className="userUpdate">
                   <span className="userUpdateTitle">Edit</span>

                   <form className="userUpdateForm" onSubmit={handleSubmit(onSubmit)}>
                       <div className="userUpdateContainer">
                           <div className="userUpdateItem">
                               <label htmlFor="firstname">Firstname</label>
                               <input {...register("firstname", { required: "Please provide a firstname"})} type="text" placeholder={user.firstname} className="userUpdateInput" id="firstname"/>
                               {errors.firstname && <p className="error">{errors.firstname.message}</p>}
                           </div>
                           <div className="userUpdateItem">
                               <label htmlFor="lastname">Lastname</label>
                               <input {...register("lastname", { required: "Please provide a lastname"})} type="text" placeholder={user.lastname} className="userUpdateInput" id="lastname"/>
                               {errors.lastname && <p className="error">{errors.lastname.message}</p>}
                           </div>
                           <div className="userUpdateItem">
                               <label htmlFor="gender">Gender</label>
                               <select {...register("gender", {required: "Please select a gender"})} id="gender" className="genderSelect">
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                               </select>
                           </div>
                           <div className="userUpdateItem">
                               <label htmlFor="phone">Phone</label>
                               {/* <div className="phoneInputContainer">
                                    <div className="phoneNoPrefixContainer">
                                        <span className="phonePrefixLabel">Prefix</span>
                                        <span className="phonePrefix">{dialCodePrefix === ""? "..." : dialCodePrefix}</span>
                                    </div>
                                    <div className="phoneNoInputContainer">
                                        <span className="phoneNoInputLabel">Phone No</span>
                                        <input type="text" placeholder="70 878 571 41" className="userUpdateInput" id="phone"/>
                                    </div>
                               </div> */}
                               <PhoneInputWithCountrySelect 
                                    placeholder="Enter phone number" 
                                    value={phoneNo}
                                    onChange={setPhoneNo}
                                />
                               {phoneErr && <p className="error">{phoneErr}</p>}
                           </div>
                           <div className="userUpdateItem">
                               <label> Date of birth </label>
                               <DatePicker 
                                    selected={dateOfBirth} 
                                    onChange={(date) => setDateOfBirth(date)}
                                />
                           </div>
                            <div className="userUpdateBtnContainer">
                                <button type="submit" className="userUpdateButton">{loading? <CircularProgress size="2rem" className="loader"/>: "Update"}</button>
                            </div>
                       </div>
                   </form>
               </div>
           </div>
        </div>
    );
}



export default User;