import React from 'react';
import './Topbar.css'
import { NotificationsNone, Language, PowerSettingsNew} from '@material-ui/icons';

const Topbar = () => {
    return (
        <header className="topbar-header">
            <div className="topbarwrapper">
                <div className="topLeft">
                    <span className="logo">e-naturals</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconsContainer">
                        <PowerSettingsNew />
                    </div>
                    <div className="topbarIconsContainer">
                        <Language />
                    </div>
                    <div className="topbarIconsContainer">
                        <NotificationsNone />
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