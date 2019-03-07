import React from 'react';
import styled from "styled-components";
import SidebarChart from './SidebarChart';
import { hideSidebar } from '../reducers/showSidebarReducer';
import { changeCompared } from '../reducers/comparedReducer';
import { lastThreeDays, compareLastThree } from '../utils/statistics';


const Sidebar = ({ extremes, store }) => {
    const { selected, locations, compared } = store.getState();

    const loc = locations.find(loc => loc.info.id === selected);
    const loc2 = locations.find(loc => loc.info.id === compared);

    if (!loc) {
        return <div></div>;
    }

    const data = loc2 ? compareLastThree(loc, loc2) : lastThreeDays(loc);

    return <div>
        <button onClick={() => store.dispatch(hideSidebar())}>close</button>
        
        <h4 style={{margin: '30px'}}>Temperatures at {data.data[0].time}:00</h4>
        {!compared ? <button onClick={() => store.dispatch(changeCompared(-1))}>compare</button> :
                     <button onClick={() => store.dispatch(changeCompared(null))}>stop comparing</button>}
        <SidebarChart data={data} domain={[Math.floor(extremes.min), Math.ceil(extremes.max)]} store={store}/>
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;