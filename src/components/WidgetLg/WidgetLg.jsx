import React from 'react';
import './WidgetLg.css';


const WidgetLg = () => {
    // const [orders, setOrders] = useState([]);

    const Button = ({type}) => {
        return <button className={"widgetLgButton " + type}>{type}</button>
    };

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest Transactions</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
                <tr>
                    <td className="widgetLgUser">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="User Identity" className="widgetLgImg" />
                        <span className="widgetLgName">Susan Carol</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$22</td>
                    <td className="widgetLgStatus"><Button type="Approved" /></td>
                </tr>
                <tr>
                    <td className="widgetLgUser">
                        <img src="../enaturals/enaturals5.jpg" alt="User Identity" className="widgetLgImg" />
                        <span className="widgetLgName">Susan Carol</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$22</td>
                    <td className="widgetLgStatus"><Button type="Declined" /></td>
                </tr>
                <tr>
                    <td className="widgetLgUser">
                        <img src="../enaturals/enaturals5.jpg" alt="User Identity" className="widgetLgImg" />
                        <span className="widgetLgName">Susan Carol</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$22</td>
                    <td className="widgetLgStatus"><Button type="Pending" /></td>
                </tr>
                <tr>
                    <td className="widgetLgUser">
                        <img src="../enaturals/enaturals5.jpg" alt="User Identity" className="widgetLgImg" />
                        <span className="widgetLgName">Susan Carol</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$22</td>
                    <td className="widgetLgStatus"><Button type="Approved" /></td>
                </tr>
                <tr>
                    <td className="widgetLgUser">
                        <img src="../enaturals/enaturals5.jpg" alt="User Identity" className="widgetLgImg" />
                        <span className="widgetLgName">Susan Carol</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$22</td>
                    <td className="widgetLgStatus"><Button type="Approved" /></td>
                </tr>
            </table>
        </div>
    );
};


export default WidgetLg;