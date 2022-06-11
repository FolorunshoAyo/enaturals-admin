import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import { LineStyle, Timeline, PersonOutline, Storefront, AttachMoney, PictureInPicture, RateReview, PlayArrowOutlined, TrackChanges, CommentOutlined, RssFeed, MenuSharp} from '@material-ui/icons';
// import { MailOutline,  DynamicFeed, ChatBubbleOutline, Error, Store } from '@material-ui/icons';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [toggleMobileSidebar, setToggleMobileSidebar] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const currLocation = useLocation();

    useEffect(() => {
        let currPath = "";
        if(currLocation !== currPath){
            currPath = currLocation.pathname;
            if(window.innerWidth <= 860){
                setShowMenu(true);
            }else{
                setShowMenu(false);
                setToggleMobileSidebar(false);
            }

        }
    }, [currLocation]);

    const handleToggle = () => {
        setToggleMobileSidebar(!toggleMobileSidebar);
    }

    const handleNavLinkClicks = () => {
        setToggleMobileSidebar(false);
    };

    return(
        <>
            <div className={`menuIconContainer ${showMenu? "reveal" : "hide"}`} onClick={handleToggle}>
                <MenuSharp className="menuIcon"/>
            </div>
            <div className={`modalBackdrop ${toggleMobileSidebar? "opened" : "closed"}`} onClick={handleToggle}></div>
            <div className="sidebar">
                <div className="brand-logo">
                    <div className="brandImgContainer">
                        <img src="../enaturals/stripped-logo.png" alt="#" className="brandImg" />
                    </div>
                </div>
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Dashboard</h3>
                        <ul className="sidebarList">
                            <NavLink to="/home" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <LineStyle className="sidebarIcon"/>
                                    Home
                                </li>
                            </NavLink>
                            <NavLink to="/analytics" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <Timeline className="sidebarIcon"/>
                                    Analytics
                                </li>
                            </NavLink>
                            <NavLink to="/gallery" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <PictureInPicture className="sidebarIcon"/>
                                    Gallery
                                </li>
                            </NavLink>
                            <NavLink to="/slides" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <PlayArrowOutlined className="sidebarIcon"/>
                                    Sildes
                                </li>
                            </NavLink>
                            <NavLink to="/banner" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <TrackChanges className="sidebarIcon"/>
                                    Banner
                                </li>
                            </NavLink>
                            <NavLink to="/testimonials" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <CommentOutlined className="sidebarIcon"/>
                                    Testimonials
                                </li>
                            </NavLink>
                            <NavLink to="/blogs" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <RssFeed className="sidebarIcon"/>
                                    My Blogs
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Quick Menu</h3>
                        <ul className="sidebarList">
                            <NavLink to="/users" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <PersonOutline className="sidebarIcon"/>
                                    Users
                                </li>
                            </NavLink>
                            <NavLink to="/products" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <Storefront className="sidebarIcon"/>
                                    Products
                                </li>
                            </NavLink>
                            <NavLink to="/orders" className="link">
                                <li className="sidebarlistItem">
                                    <AttachMoney className="sidebarIcon"/>
                                    Orders
                                </li>
                            </NavLink>
                            <NavLink to="/product-reviews" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <RateReview className="sidebarIcon"/>
                                    Product Reviews
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                    {/* <div className="sidebarMenu">
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
                    </div> */}
                </div>
            </div>
            <div className={`sidebar mobileSidebar ${toggleMobileSidebar? "opened" : "closed"}`}>
                <div className="brand-logo">
                    <div className="brandImgContainer">
                        <img src="../enaturals/stripped-logo.png" alt="#" className="brandImg" />
                    </div>
                </div>
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Dashboard</h3>
                        <ul className="sidebarList">
                            <NavLink to="/" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <LineStyle className="sidebarIcon"/>
                                    Home
                                </li>
                            </NavLink>
                            <NavLink to="/analytics" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <Timeline className="sidebarIcon"/>
                                    Analytics
                                </li>
                            </NavLink>
                            <NavLink to="/gallery" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <PictureInPicture className="sidebarIcon"/>
                                    Gallery
                                </li>
                            </NavLink>
                            <NavLink to="/slides" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <PlayArrowOutlined className="sidebarIcon"/>
                                    Sildes
                                </li>
                            </NavLink>
                            <NavLink to="/banner" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <TrackChanges className="sidebarIcon"/>
                                    Banner
                                </li>
                            </NavLink>
                            <NavLink to="/testimonials" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <CommentOutlined className="sidebarIcon"/>
                                    Testimonials
                                </li>
                            </NavLink>
                            <NavLink to="/blogs" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <RssFeed className="sidebarIcon"/>
                                    My Blogs
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Quick Menu</h3>
                        <ul className="sidebarList">
                            <NavLink to="/users" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <PersonOutline className="sidebarIcon"/>
                                    Users
                                </li>
                            </NavLink>
                            <NavLink to="/products" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <Storefront className="sidebarIcon"/>
                                    Products
                                </li>
                            </NavLink>
                            <li className="sidebarlistItem">
                                <AttachMoney className="sidebarIcon"/>
                                Transactions
                            </li>
                            <NavLink to="/product-reviews" className="link">
                                <li className="sidebarlistItem" onClick={handleNavLinkClicks}>
                                    <RateReview className="sidebarIcon"/>
                                    Product Reviews
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                    {/* <div className="sidebarMenu">
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
                    </div> */}
                </div>
            </div>
        </>
    );
};




export default Sidebar;