import React from 'react';
import styled from "styled-components";

function Sidebar({selectedLocationId, observationLocations}) {
    //const id = getSelectedLocatoinId(selectedLocationId);
    const id = selectedLocationId;

    const loc = observationLocations.find(loc => loc.info.id === id);
    console.log(loc);
    return <div>
        <pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;