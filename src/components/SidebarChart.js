import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

const SidebarChart = ({data, domain, store}) => (
    <LineChart width={200} height={200} data={data.data}>
        <CartesianGrid stroke="#ccc" />
        <Line name={data.name} isAnimationActive={false} dot={true} type="monotone" dataKey="value" stroke="#0000FF" />
        {data.name2 ? <Line name={data.name2} isAnimationActive={false} dot={true} type="monotone" dataKey="value2" stroke="#FF0000" /> :
                      null}
        <Legend />
        <XAxis dataKey="day" />
        <YAxis domain={domain}/>
    </LineChart>
)

export default SidebarChart;