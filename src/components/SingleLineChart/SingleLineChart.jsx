import React from 'react';
import { 
LineChart, 
Line, 
XAxis, 
CartesianGrid, 
Tooltip, 
Legend, 
ResponsiveContainer 
} from 'recharts';


const SingleLineChart = ({data, dataKey, grid}) => {
    return (
        <ResponsiveContainer width="100%" aspect={4 / 2}>
            <LineChart data={data}> 
                <XAxis dataKey="name" stroke="#acbfa3"/>
                <Line type="monotone" dataKey={dataKey} stroke="#acbfa3"/>
                <Tooltip />
                {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>}
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    );
};



export default SingleLineChart;