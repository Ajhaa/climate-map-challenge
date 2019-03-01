import React from 'react';
import styled from "styled-components";

function Sidebar({setSelected, selectedLocationId, observationLocations}) {
    const id = selectedLocationId;

    const loc = observationLocations.find(loc => loc.info.id === id);
    console.log(loc);
    return <div>
        <button onClick={() => setSelected(false)}>close</button>
        <pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;