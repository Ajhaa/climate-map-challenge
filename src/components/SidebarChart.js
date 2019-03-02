import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const SidebarChart = ({data, domain}) => (
    <LineChart width={200} height={200} data={data}>
        <CartesianGrid stroke="#ccc" />
        <Line isAnimationActive={false} dot={true} type="monotone" dataKey="value" stroke="#8884d8" />
        <XAxis dataKey="day" />
        <YAxis domain={domain}/>
    </LineChart>
)

export default SidebarChart;