import React from 'react';
import "./Sidebar.css";
import { LineStyle, Timeline, TrendingUp, PersonOutline, Storefront, AttachMoney, BarChart, MailOutline,  DynamicFeed, ChatBubbleOutline, Error, Store} from '@material-ui/icons';

const Sidebar = () => {
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarlistItem">
                            <LineStyle className="sidebarIcon"/>
                            Home
                        </li>
                        <li className="sidebarlistItem">
                            <Timeline className="sidebarIcon"/>
                            Analytics
                        </li>
                        <li className="sidebarlistItem">
                            <TrendingUp className="sidebarIcon"/>
                            Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <li className="sidebarlistItem">
                            <PersonOutline className="sidebarIcon"/>
                            Users
                        </li>
                        <li className="sidebarlistItem">
                            <Storefront className="sidebarIcon"/>
                            Products
                        </li>
                        <li className="sidebarlistItem">
                            <AttachMoney className="sidebarIcon"/>
                            Transactions
                        </li>
                        <li className="sidebarlistItem">
                            <BarChart className="sidebarIcon"/>
                            Transactions
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarlistItem">
                            <MailOutline className="sidebarIcon"/>
                            Mail
                        </li>
                        <li className="sidebarlistItem">
                            <DynamicFeed className="sidebarIcon"/>
                            Feedback
                        </li>
                        <li className="sidebarlistItem">
                            <ChatBubbleOutline className="sidebarIcon"/>
                            Messages
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarlistItem">
                            <Store className="sidebarIcon"/>
                            Manage
                        </li>
                        <li className="sidebarlistItem">
                            <Timeline className="sidebarIcon"/>
                            Analytics
                        </li>
                        <li className="sidebarlistItem">
                            <Error className="sidebarIcon"/>
                            Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};




export default Sidebar;