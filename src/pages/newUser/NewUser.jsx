import React, { useState } from 'react';
import './NewUser.css';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css';



const NewUser = () => {
    const [value, setValue] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    
    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input type="text" placeholder="folumania"/>
                </div>
                <div className="newUserItem">
                    <label>First Name</label>
                    <input type="text" placeholder="Folorunsho"/>
                </div>
                <div className="newUserItem">
                    <label>Last Name</label>
                    <input type="text" placeholder="Shodiya"/>
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" placeholder="folushoayomide11@gmail.com" />
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input type="password" placeholder="password" />
                </div>
                <div className="newUserItem">
                    <label>Comfirm Password</label>
                    <input type="password" placeholder="retype password" />
                </div>
                <div className="newUserItem">
                    <label>Phone</label>
                    <PhoneInputWithCountrySelect 
                    placeholder="Enter phone number" 
                    value={value}
                    onChange={setValue}
                    />
                </div>
                <div className="newUserItem">
                    <label>Address</label>
                    <input type="text" placeholder="Lagos State | Nigeria"/>
                </div>
                <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                        <input type="radio" name="gender" id="male" value="male"/>
                        <label for="male">Male</label>
                        <input type="radio" name="gender" id="female" value="female"/>
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="other" value="other"/>
                        <label for="other">Other</label>
                    </div>
                </div>
                <div className="newUserItem">
                    <label>Date of birth</label>
                    <DatePicker 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)}
                    />
                </div>
                <div className="newUserItem">
                    <label>Active</label>
                    <select className="newUserSelect" name="active" id="active">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <button className="newUserButton">Create</button>
            </form>
        </div>
    );
};



export default NewUser;