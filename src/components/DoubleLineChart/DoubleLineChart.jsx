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


const DoubleLineChart = ({data, dataKeys, grid}) => {
    return (
        <ResponsiveContainer width={"100%"} aspect={4 / 2}>
            <LineChart data={data}> 
                <XAxis dataKey="name" stroke="#acbfa3"/>
                <Line type="monotone" dataKey={dataKeys[0]} stroke="#acbfa3"/>
                <Line type="monotone" dataKey={dataKeys[1]} stroke="#b8a398"/>
                <Tooltip />
                {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>}
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    );
};



export default DoubleLineChart;