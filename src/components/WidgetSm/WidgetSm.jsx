import React, { useState, useEffect } from "react";
import { Visibility } from "@material-ui/icons";
import './WidgetSm.css';
import { userRequest } from "../../requestMethod";


const WidgetSm = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try{
                const res = await userRequest("users/?new=true");
                setUsers(res.data);
            }catch (error){
                console.log(error);
            }
        };

        getUsers();
    }, []);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Members</span>
            <ul className="widgetSmList">
                {
                    (users.length !== 0) && (
                        users.map(user => (
                            <li className="widgetSmListItem" key={user._id}>
                                <img src="../enaturals/enaturals5.jpg" alt="User Identity" className="widgetSmImage" />
                                <div className="widgetSmUser">
                                    <span className="widgetSmUsername">{user.username}</span>
                                    <span className="widgetSmUserTitle">{user.email}</span>
                                </div>
                                <button className="widgetSmButton">
                                    <Visibility className="widgetSmIcon"/>
                                    Display
                                </button>
                            </li>
                        ))
                    )
                }
            </ul>
        </div>
    );
};


export default WidgetSm;