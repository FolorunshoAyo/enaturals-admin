import React from 'react';
import "./Sidebar.css";
import { LineStyle, Timeline, PersonOutline, Storefront, AttachMoney, MailOutline,  DynamicFeed, ChatBubbleOutline, Error, Store, PictureInPicture, RateReview, PlayArrowOutlined, InfoOutlined, TrackChanges, CommentOutlined} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <NavLink to="/" className="link">
                            <li className="sidebarlistItem">
                                <LineStyle className="sidebarIcon"/>
                                Home
                            </li>
                        </NavLink>
                        <NavLink to="/analytics" className="link">
                            <li className="sidebarlistItem">
                                <Timeline className="sidebarIcon"/>
                                Analytics
                            </li>
                        </NavLink>
                        <NavLink to="/gallery" className="link">
                            <li className="sidebarlistItem">
                                <PictureInPicture className="sidebarIcon"/>
                                Gallery
                            </li>
                        </NavLink>
                        <NavLink to="/slides" className="link">
                            <li className="sidebarlistItem">
                                <PlayArrowOutlined className="sidebarIcon"/>
                                Sildes
                            </li>
                        </NavLink>
                        <NavLink to="/banner" className="link">
                            <li className="sidebarlistItem">
                                <TrackChanges className="sidebarIcon"/>
                                Banner
                            </li>
                        </NavLink>
                        <NavLink to="/testimonials" className="link">
                            <li className="sidebarlistItem">
                                <CommentOutlined className="sidebarIcon"/>
                                Testimonials
                            </li>
                        </NavLink>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <NavLink to="/users" className="link">
                            <li className="sidebarlistItem">
                                <PersonOutline className="sidebarIcon"/>
                                Users
                            </li>
                        </NavLink>
                        <NavLink to="/products" className="link">
                            <li className="sidebarlistItem">
                                <Storefront className="sidebarIcon"/>
                                Products
                            </li>
                        </NavLink>
                        <li className="sidebarlistItem">
                            <AttachMoney className="sidebarIcon"/>
                            Transactions
                        </li>
                        <li className="sidebarlistItem">
                            <RateReview className="sidebarIcon"/>
                            Product Reviews
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