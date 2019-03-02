import React from 'react';
import styled from "styled-components";
import SidebarChart from './SidebarChart';

function Sidebar({setSelected, selectedLocationId, observationLocations, extremes}) {
    const id = selectedLocationId;

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
        <SidebarChart data={temperatureData} domain={[Math.floor(extremes.min), Math.ceil(extremes.max)]}/>
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;