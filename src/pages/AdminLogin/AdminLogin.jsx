import React, { useState } from 'react';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import "./AdminLogin.css";


const AdminLogin = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handlePasswordState = () => {
        console.log(passwordVisibility);
        setPasswordVisibility(!passwordVisibility);
    }

    return(
        <div className="loginContainer">
            <div className="loginBox">
                <h2 className="title">Admin Login</h2>
                <form className="loginForm">
                    <div className="loginFormGroup">
                        <label htmlFor="username" className="loginLabel">Username</label>
                        <input type="text" className="loginInput" id="username" placeholder="e.g Trixx..." />
                    </div>
                    <div className="loginFormGroup">
                        <label htmlFor="pwd" className="loginLabel">Password</label>
                        <div className="passwordContainer">
                            <input type={passwordVisibility? "text" : "password"} className="passwordInput" id="pwd" placeholder="Enter password..."/>
                            <div className="iconContainer">
                                {
                                    passwordVisibility? 
                                    <VisibilityOff style={{fontSize: 20, cursor: "pointer"}} onClick={handlePasswordState}/> 
                                    : 
                                    <Visibility style={{fontSize: 20, cursor: "pointer"}} onClick={handlePasswordState}/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="submitBtnContainer">
                        <button type="submit" className="loginBtn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default AdminLogin;