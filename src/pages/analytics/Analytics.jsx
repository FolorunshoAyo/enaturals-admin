import { Description, Money, RemoveRedEyeOutlined } from '@material-ui/icons';
import React, {useEffect} from 'react';
import DoubleLineChart from '../../components/DoubleLineChart/DoubleLineChart';
import SingleLineChart from '../../components/SingleLineChart/SingleLineChart';
import { newVsReturningData, salesData, transactionsData, visitData } from '../../data';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Analytics.css';


const Analytics = () => {
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
  
    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

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
                    <div className="singleChartContainer">
                        <SingleLineChart data={salesData} dataKey={"Sales"} grid/>
                    </div>
                </div>
                <div className="topWidgetRight">
                    <h3 className="widgetTitle">Visits</h3>
                    <div className="chartContainer">
                        <SingleLineChart data={visitData} dataKey={"Visits"} grid/>
                    </div>
                </div>
            </div>
            <div className="middleWidget">
                <div className="middleWidgetLeft">
                    <h3 className="widgetTitle">Transactions</h3>
                    <div className="chartContainer">
                        <SingleLineChart data={transactionsData} dataKey={"Transactions"} grid/>
                    </div>
                </div>
                <div className="middleWidgetRight">
                    <h3 className="widgetTitle">New vs Returing Buyers</h3>
                    <div className="chartContainer">
                        <DoubleLineChart data={newVsReturningData} dataKeys={["New", "Returning"]} grid/>
                    </div>
                </div>
            </div>
            <div className="bottomWidget">
                <div className="bottomWidgetLeft">
                    <h3 className="widgetTitle">Recent Buyers</h3>
                    <ul className="bottomWidgetRightList">
                        <li className="bottomWidgetRightListItem">
                            <img src="../enaturals/enaturals5.jpg" alt="profile pic" className="bottomWidgetListImg" />
                            <div className="bottomWidgetRightProfile">
                                <span className="bottomWidgetRightName">Shodiya Folorunsho</span>
                                <span className="bottomWidgetRightId">STR-10834</span>
                            </div>
                            <img src="../enaturals/enaturals12.jpg" alt="product pic" className="bottomWidgetRightProductImg" />
                        </li>
                    </ul>
                </div>
                <div className="bottomWidgetRight">
                    <h3 className="widgetTitle">Top selling Products</h3>
                    <ul className="bottomWidgetProductList">
                        <li className="bottomWidgetProductListItem">
                            <img src="../enaturals/enaturals12.jpg" alt="product" className="bottomWidgetProductImg" />
                            <div className="bottomWidgetProductDescription">
                                <span className="bottomWidgetProductTitle">Whitening Oil</span>
                                <span className="bottomWidgetProductCategories">Moisturizing . Conditioning</span>
                            </div>
                            <div className="bottomWidgetProductPriceContainer">
                                <span className="bottomWidgetProductPrice">$129.00</span>
                                <span className="bottomWidgetProductText">Sales</span>
                            </div>
                        </li>
                        <li className="bottomWidgetProductListItem">
                            <img src="../enaturals/enaturals12.jpg" alt="product" className="bottomWidgetProductImg" />
                            <div className="bottomWidgetProductDescription">
                                <span className="bottomWidgetProductTitle">Whitening Oil</span>
                                <span className="bottomWidgetProductCategories">Moisturizing . Conditioning</span>
                            </div>
                            <div className="bottomWidgetProductPriceContainer">
                                <span className="bottomWidgetProductPrice">$129.00</span>
                                <span className="bottomWidgetProductText">Sales</span>
                            </div>
                        </li>
                        <li className="bottomWidgetProductListItem">
                            <img src="../enaturals/enaturals12.jpg" alt="product" className="bottomWidgetProductImg" />
                            <div className="bottomWidgetProductDescription">
                                <span className="bottomWidgetProductTitle">Whitening Oil</span>
                                <span className="bottomWidgetProductCategories">Moisturizing . Conditioning</span>
                            </div>
                            <div className="bottomWidgetProductPriceContainer">
                                <span className="bottomWidgetProductPrice">$129.00</span>
                                <span className="bottomWidgetProductText">Sales</span>
                            </div>
                        </li>
                    </ul> 
                </div>
            </div>
        </div>
    );
};



export default Analytics;