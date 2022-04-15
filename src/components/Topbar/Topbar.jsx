import React from 'react';
import './Topbar.css'
import { NotificationsNone, Language, PowerSettingsNew} from '@material-ui/icons';

const Topbar = () => {
    return (
        <header className="topbar-header">
            <div className="topbarwrapper">
                <div className="topRight">
                    <div className="topbarIconsContainer">
                        <PowerSettingsNew className="topIcon"/>
                    </div>
                    <div className="topbarIconsContainer">
                        <Language className="topIcon"/>
                    </div>
                    <div className="topbarIconsContainer">
                        <NotificationsNone className="topIcon"/>
                        <span className="topIconBag"> 2 </span>
                    </div>
                    <div className="imageTopAvatar">
                        <img src="../enaturals/enaturals5.jpg" alt="avatar icon" />
                    </div>
                </div>
            </div>
        </header>
    );
}



export default Topbar;