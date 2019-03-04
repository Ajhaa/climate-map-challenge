import React from 'react';
import {Marker, Popup} from 'react-leaflet';
import { changeSelected } from '../reducers/selectedReducer';
import { showSidebar } from '../reducers/showSidebarReducer';

const GeoMarker = ({loc, store}) => (
  <Marker position={[loc.position.lat, loc.position.lon]}
          onClick={() => store.dispatch(changeSelected(loc.info.id))}>
    <Popup>
      <p>{loc.info.name}, {loc.info.region}</p>
      <p>temperature: {loc.data.t.timeValuePairs[loc.data.t.timeValuePairs.length-1].value}°C</p>
      <p><button onClick={() => store.dispatch(showSidebar())}>more info</button></p>
    </Popup>
  </Marker>
)

export default GeoMarker;
