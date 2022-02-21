import React from 'react';
import Chart from '../../components/Chart/Chart';
import FeaturedInfo from '../../components/FeaturedInfo/FeaturedInfo';
import './Home.css';
import { userData } from '../../data';
import WidgetSm from '../../components/WidgetSm/WidgetSm';
import WidgetLg from '../../components/WidgetLg/WidgetLg';

const Home = () => {
  return (
    <div className="home">
        <div className="pagination">
          Dashboard &gt; Home
        </div>
        <FeaturedInfo />
        <div className="chartContainer">
          <Chart title="User Analytics" data={userData} grid dataKey="Active User"/>
        </div>
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
    </div>
  );
};



export default Home;

