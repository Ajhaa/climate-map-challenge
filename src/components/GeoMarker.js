import React from 'react';
import {Marker, Popup} from 'react-leaflet';

const GeoMarker = ({loc, setSelectedLocation, setShowSidebar}) => (
  <Marker position={[loc.position.lat, loc.position.lon]}
          onClick={() => setSelectedLocation(loc.info.id)}>
    <Popup>
      <p>{loc.info.name}, {loc.info.region}</p>
      <p>temperature: {loc.data.t.timeValuePairs[loc.data.t.timeValuePairs.length-1].value}°C</p>
      <p><button onClick={() =>setShowSidebar(true)}>more info</button></p>
    </Popup>
  </Marker>
)

export default GeoMarker;
