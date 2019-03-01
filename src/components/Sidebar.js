import React from 'react';
import styled from "styled-components";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const lastThreeDays = (timeValue) => {
    let len = timeValue.length;
    let temperatureData = [timeValue[len-49], timeValue[len-25], timeValue[len-1]];
    temperatureData = temperatureData.map(t => t.value);

    return temperatureData;
}

function Sidebar({setSelected, selectedLocationId, observationLocations}) {
    const id = selectedLocationId;

    const lastThrees = observationLocations.map(l => lastThreeDays(l.data.t.timeValuePairs));
    const max = Math.max(...lastThrees.map(l => Math.max(...l)));
    const min = Math.min(...lastThrees.map(l => Math.min(...l)));

    const loc = observationLocations.find(loc => loc.info.id === id);
    if (!loc) {
        return <div></div>;
    }

    let timeValue = loc.data.t.timeValuePairs;
    let len = timeValue.length;
    let temperatureData = [timeValue[len-49], timeValue[len-25], timeValue[len-1]];
    temperatureData = temperatureData.map(t => {
        const date = new Date(t.time);
        const hours = date.getHours();
        const day = `${date.getDate()}.${date.getMonth()+1}.`;
        return {value: t.value, day, time: hours}
    })
    return <div>
        <button onClick={() => setSelected(false)}>close</button>
        <pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>
        
        <h4 style={{margin: '30px'}}>Temperatures at {temperatureData[0].time}:00</h4>
        <LineChart width={200} height={200} data={temperatureData}>
            <CartesianGrid stroke="#ccc" />
            <Line isAnimationActive={false} dot={true} type="monotone" dataKey="value" stroke="#8884d8" />
            <XAxis dataKey="day" />
            <YAxis domain={[min, max]}/>
        </LineChart>
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;