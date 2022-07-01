import React, { useState, useEffect } from "react";
import { Visibility } from "@material-ui/icons";
import './WidgetSm.css';
import { userRequest } from "../../requestMethod";
// import { logout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// const toastSettings = {
//     position: "top-center",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
// }

const WidgetSm = () => {
    const [users, setUsers] = useState([]);
    const [accessTokenGen, setAccessTokenGen] = useState(false);
    const dispatch = useDispatch;

    useEffect(() => {
        const getUsers = async () => {
            try{
                const res = await userRequest("users/?new=true");
                setUsers(res.data);
            }catch (error){
                console.log(error);
            }
        };

        accessTokenGen? getUsers() : setAccessTokenGen(true);
    }, [accessTokenGen, dispatch]);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Members</span>
            <ul className="widgetSmList">
                {
                    (users.length !== 0) && (
                        users.map(user => (
                            <li className="widgetSmListItem" key={user._id}>
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="User Identity" className="widgetSmImage" />
                                <div className="widgetSmUser">
                                    <span className="widgetSmUsername">{user.username}</span>
                                    <span className="widgetSmUserTitle">{user.email}</span>
                                </div>
                                <button className="widgetSmButton">
                                    <Link to={`/user/view/${user._id}`} className="widgetSmLink">
                                        <Visibility className="widgetSmIcon"/>
                                        Display
                                    </Link>
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