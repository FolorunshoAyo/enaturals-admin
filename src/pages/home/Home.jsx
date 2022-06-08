import React, { useState, useEffect, useMemo } from 'react';
import Chart from '../../components/Chart/Chart';
import FeaturedInfo from '../../components/FeaturedInfo/FeaturedInfo';
import './Home.css';
// import { userData } from '../../data';
import WidgetSm from '../../components/WidgetSm/WidgetSm';
import WidgetLg from '../../components/WidgetLg/WidgetLg';
import { userRequest } from '../../requestMethod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tokenInvalidLogout } from '../../redux/apiCalls';

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const [accessTokenGen, setAccessTokenGen] = useState(false);
  const adminUser = useSelector(state => state.adminUser.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(adminUser === null){
      navigate("/");
    }
  }, [adminUser, navigate]);

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
        tokenInvalidLogout(dispatch);
      }
    }
  
    accessTokenGen? getUserStats() : setAccessTokenGen(true);
  }, [accessTokenGen, MONTHS, dispatch]);
  
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

