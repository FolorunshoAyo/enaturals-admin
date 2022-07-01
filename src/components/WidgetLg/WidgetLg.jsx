import React from 'react';
import LatestTransactions from '../LatestTransactions/LatestTransactions';
import './WidgetLg.css';


const WidgetLg = () => {

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest Transactions</h3>
            <table className="widgetLgTable">
                <thead>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Customer</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Amount</th>
                        <th className="widgetLgTh">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <LatestTransactions />
                </tbody>
            </table>
        </div>
    );
};


export default WidgetLg;