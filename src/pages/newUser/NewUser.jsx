import React, { useState, useEffect } from 'react';
import './NewUser.css';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { dialCodes } from '../../dialCodes';
import { addUser } from '../../redux/apiCalls';
import { publicRequest } from '../../requestMethod';
import { toast } from 'react-toastify';

const toastSettings = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

const NewUser = () => {
    const [phoneNo, setPhoneNo] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [phoneErr, setPhoneErr] = useState("");
    const [loading, setLoading] = useState("");
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formSchema = Yup.object().shape({
        username: Yup.string()
        .required("Please provide a username"),
        firstname: Yup.string()
        .required("Please input firstname"),
        lastname: Yup.string()
        .required("Please input lastname"),
        email: Yup.string()
        .required("Please input email"),
        gender: Yup.string()
        .required("Please select gender")
        .nullable(),
        password: Yup.string()
          .required('Password is mandatory')
          .min(6, 'Password must be at least 6 char long'),
        confirmPwd: Yup.string()
          .required('Password is mandatory')
          .oneOf([Yup.ref('password')], 'Passwords does not match'),
    });

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState: { errors } } = useForm(formOptions);

    const handleDialCodeUpdate = (dialCode) => {
        setPhoneNo(dialCode);
    };

    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    useEffect(() => {
        const getDialCode = async () => {
            try{
                const res = await publicRequest.get("http://ip-api.com/json");
                handleDialCodeUpdate((dialCodes.find(dialCode => dialCode.name === res.data.country).dial_code));
            }catch(error){
                toast.error("Unable to fetch county code (501)", toastSettings)
            }
        }; 

        getDialCode();
    }, []);

    const onSubmit = (data) => {
        if(phoneNo === ""){
            setPhoneErr("Please input a phone number");
            return;
        }else{
            setPhoneErr("");

            setLoading(true);
            addUser({...data, phoneno: phoneNo, dob: dateOfBirth === ""? "" : dateOfBirth.toISOString().substring(0, 10)}, dispatch);
            setTimeout(() => {
                setLoading(false);
            }, 3000);
            reset();
        }
    };

    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="newUserItem">
                    <label htmlFor="username">Username</label>
                    <input {...register("username")} type="text" placeholder="folumania" id="username"/>
                    {errors.username && <p className="error">{errors.username.message}</p>}
                </div>
                <div className="newUserItem">
                    <label htmlFor="firstname">First Name</label>
                    <input {...register("firstname")} type="text" placeholder="Folorunsho" id="firstname"/>
                    {errors.firstname && <p className="error">{errors.firstname.message}</p>}
                </div>
                <div className="newUserItem">
                    <label htmlFor="lastname">Last Name</label>
                    <input {...register("lastname")} type="text" placeholder="Shodiya" id="lastname"/>
                    {errors.lastname && <p className="error">{errors.lastname.message}</p>}
                </div>
                <div className="newUserItem">
                    <label htmlFor="email">Email</label>
                    <input {...register("email")} type="email" placeholder="folushoayomide11@gmail.com" id="email"/>
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                <div className="newUserItem">
                    <label htmlFor="pwd">Password</label>
                    <input {...register("password")} type="password" placeholder="password" id="pwd"/>
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                <div className="newUserItem">
                    <label htmlFor="cpwd">Confirm Password</label>
                    <input {...register("confirmPwd")} type="password" placeholder="retype password" id="cpwd"/>
                    {errors.confirmPwd && <p className="error">{errors.confirmPwd.message}</p>}
                </div>
                <div className="newUserItem">
                    <label>Phone</label>
                    <PhoneInputWithCountrySelect 
                    placeholder="Enter phone number" 
                    value={phoneNo}
                    onChange={setPhoneNo}
                    />
                    {phoneErr && <p className="error">{phoneErr}</p>}
                </div>
                <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                        <input {...register("gender")} type="radio" id="male" value="male"/>
                        <label htmlFor="male">Male</label>
                        <input {...register("gender")} type="radio" id="female" value="female"/>
                        <label htmlFor="female">Female</label>
                        <input {...register("gender")} type="radio" id="other" value="other" />
                        <label htmlFor="other">Other</label>
                    </div>
                    {errors.gender && <p className="error">{errors.gender.message}</p>}
                </div>
                <div className="newUserItem">
                    <label>Date of birth</label>
                    <DatePicker 
                        selected={dateOfBirth} 
                        onChange={(date) => setDateOfBirth(date)}
                    />
                </div>
                <button type="submit" className="newUserButton">{loading? <CircularProgress size="2rem" className="loader"/> : "Create"}</button>
            </form>
        </div>
    );
};



export default NewUser;