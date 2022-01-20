import React from "react";
import { Visibility } from "@material-ui/icons";
import './WidgetSm.css';


const WidgetSm = () => {
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Members</span>
            <ul className="widgetSmList">
                <li className="widgetSmListItem">
                    <img src="../enaturals/enaturals5.jpg" alt="User Identity" className="widgetSmImage" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Anna</span>
                        <span className="widgetSmUserTitle">Software Engineer</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon"/>
                        Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img src="../enaturals/enaturals5.jpg" alt="User Identity" className="widgetSmImage" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Anna</span>
                        <span className="widgetSmUserTitle">Software Engineer</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon"/>
                        Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img src="../enaturals/enaturals5.jpg" alt="User Identity" className="widgetSmImage" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Anna</span>
                        <span className="widgetSmUserTitle">Software Engineer</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon"/>
                        Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img src="../enaturals/enaturals5.jpg" alt="User Identity" className="widgetSmImage" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Anna</span>
                        <span className="widgetSmUserTitle">Software Engineer</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon"/>
                        Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img src="../enaturals/enaturals5.jpg" alt="User Identity" className="widgetSmImage" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Anna</span>
                        <span className="widgetSmUserTitle">Software Engineer</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon"/>
                        Display
                    </button>
                </li>
            </ul>
        </div>
    );
};


export default WidgetSm;