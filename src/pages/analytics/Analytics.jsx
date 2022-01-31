import { Description, Money, RemoveRedEyeOutlined } from '@material-ui/icons';
import React from 'react';
import './Analytics.css';


const Analytics = () => {
    return(
        <div className="analytics">
            <div class="pagination">
                Dashboard &gt; Analytics
            </div>
            <h1 className="analyticsTitle">Analytics</h1>
            <div className="topInfo">
                <div className="topInfoItem">
                    <div className="topInfoDetails">
                        <span className="topInfoNo">83</span>
                        <span className="topInfoCategory">Registered Users</span>
                        <span className="topInfoDate">As at this month</span>
                    </div>
                    <div className="topInfoItemIconContainer">
                        <div className="topInfoIconContainer">
                            <Description className="topInfoIcon"/>
                        </div>
                    </div>
                </div>
                <div className="topInfoItem">
                    <div className="topInfoDetails">
                        <span className="topInfoNo">135</span>
                        <span className="topInfoCategory">Daily Visitors</span>
                        <span className="topInfoDate">As at this month</span>
                    </div>
                    <div className="topInfoItemIconContainer">
                        <div className="topInfoIconContainer">
                            <RemoveRedEyeOutlined className="topInfoIcon"/>
                        </div>
                    </div>
                </div>
                <div className="topInfoItem">
                    <div className="topInfoDetails">
                        <span className="topInfoNo">$123,000</span>
                        <span className="topInfoCategory">Total Income</span>
                        <span className="topInfoDate">As at this month</span>
                    </div>
                    <div className="topInfoItemIconContainer">
                        <div className="topInfoIconContainer">
                            <Money className="topInfoIcon"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="topWidget">
                <div className="topWidgetLeft">
                    <h3 className="widgetTitle">Sales</h3>
                    <div className="chartContainer">
                        {/* Chart */}
                    </div>
                </div>
                <div className="topWidgetRight">
                    <h3 className="widgetTitle">Top selling Products</h3>
                    <ul className="topWidgetProductList">
                        <li className="topWidgetProductListItem">
                            <img src="../enaturals/enaturals12.jpg" alt="product" className="topWidgetProductImg" />
                            <div className="topWidgetProductDescription">
                                <span className="topWidgetProductTitle">Whitening Oil</span>
                                <span className="topWidgetProductCategories">Moisturizing . Conditioning</span>
                            </div>
                            <div className="topWidgetProductPriceContainer">
                                <span className="topWidgetProductPrice">$129.00</span>
                                <span className="topWidgetProductText">Sales</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="middleWidget">
                <div className="middleWidgetLeft">
                    <h3 className="widgetTitle">Transactions</h3>
                    <div className="chartContainer">
                        {/* Chart */}
                    </div>
                </div>
                <div className="middleWidgetCenter">
                    <h3 className="widgetTitle">New vs Returing Buyers</h3>
                    <div className="chartContainer">
                        {/* Line Chart */}
                    </div>
                </div>
                <div className="middleWidgetRight">
                    <h3 className="widgetTitle">Recent Buyers</h3>
                    <ul className="middleWidgetRightList">
                        <li className="middleWidgetRightListItem">
                            <img src="../enaturals/enaturals5.jpg" alt="profile pic" className="middleWidgetListImg" />
                            <div className="middleWidgetRightProfile">
                                <span className="middleWidgetRightName">Shodiya Folorunsho</span>
                                <span className="middleWidgetRightId">STR-10834</span>
                            </div>
                            <img src="../enaturals/enaturals12.jpg" alt="product pic" className="middleWidgetRightProductImg" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bottomWidget">
                <div className="bottomWidgetLeft">
                    <h3 className="widgetTitle">Gender Breakdown</h3>
                    <div className="chartContainer">
                        {/* Pie Chart */}
                    </div>
                </div>
                <div className="bottomWidgetCenter">
                    <h3 className="widgetTitle">Age Range Breakdown</h3>
                    <div className="chartContainer">
                        {/* Pie Chart */}
                    </div>
                </div>
                <div className="bottomWidgetRight">
                    <h3 className="widgetTitle">Visits</h3>
                    {/* Line Chart */}
                </div>
            </div>
        </div>
    );
};



export default Analytics;