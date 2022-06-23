import React, {useState} from 'react';
import './Topbar.css';
import { NotificationsNone, Language, PowerSettingsNew} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { confirm } from 'react-confirm-box';
import { logout } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';

const Topbar = ({display}) => {
    const [toggleProfile, setToggleProfile] = useState(false);
    const dispatch = useDispatch();
    
    const toggleMenu = () => {
        setToggleProfile(!toggleProfile);
    };

    const handleLogout = async () => {
        const validateLogout = await confirm("Logout?");

        if(validateLogout){
           logout(dispatch)
        }else{
            return;
        }
    };

    return (
        <header className="topbar-header" style={{display: (display)? "block" : "none"}}>
            <div className="topbarwrapper">
                <div className="topRight">
                    <div className="topbarIconsContainer" onClick={handleLogout}>
                        <PowerSettingsNew className="topIcon"/>
                    </div>
                    {/* <div className="topbarIconsContainer">
                        <Language className="topIcon"/>
                    </div> */}
                    {/* <div className="topbarIconsContainer">
                        <NotificationsNone className="topIcon"/>
                        <span className="topIconBag"> 2 </span>
                    </div> */}
                    <div className="imageTopAvatar" onClick={toggleMenu}>
                        <img src="../enaturals/enaturals5.jpg" alt="avatar icon" />
                        <div className={`changePasswordContainer ${toggleProfile? "active" : ""}`}>
                            <Link to="/changepass" className="changePasswordLink">
                                change password
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}



export default Topbar;