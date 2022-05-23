import React, { useState, useEffect, useMemo } from 'react';
import Chart from '../../components/Chart/Chart';
import FeaturedInfo from '../../components/FeaturedInfo/FeaturedInfo';
import './Home.css';
// import { userData } from '../../data';
import WidgetSm from '../../components/WidgetSm/WidgetSm';
import WidgetLg from '../../components/WidgetLg/WidgetLg';
import { userRequest } from '../../requestMethod';

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(() => 
  [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  []
  );

  useEffect(() => {
    const getUserStats = async () => {
      try{
        const res = await userRequest("/users/stats");
        // SORT THE MONTHS BY ID.
        const sortedUserStats = res.data.sort((a,b) => a._id - b._id);

        sortedUserStats.forEach(userStat => {
          setUserStats(prev => [
            ...prev,
            {name: MONTHS[userStat._id - 1], "Active User": userStat.total}
          ]);
        });

      }catch(error){
        console.log(error);
      }
    }

    getUserStats();
  }, [MONTHS]);
  
  return (
    <div className="home">
        <div className="pagination">
          Dashboard &gt; Home
        </div>
        <FeaturedInfo />
        <div className="chartContainer">
          <Chart title="User Analytics" data={userStats} grid dataKey="Active User"/>
        </div>
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
    </div>
  );
};



export default Home;

