import React from 'react';
import {Marker, Popup} from 'react-leaflet';
import { changeSelected } from '../reducers/selectedReducer';
import { changeCompared } from '../reducers/comparedReducer';
import { showSidebar } from '../reducers/showSidebarReducer';

const selection = (store) => {
  const { compared } = store.getState();
  if (compared) {
    return (id) => store.dispatch(changeCompared(id));
  }
  
  return (id) => store.dispatch(changeSelected(id));
}

const GeoMarker = ({loc, store}) => (
  <Marker position={[loc.position.lat, loc.position.lon]}
          onClick={() => selection(store)(loc.info.id)}>
    <Popup>
      <p>{loc.info.name}, {loc.info.region}</p>
      <p>temperature: {loc.temperature}°C</p>
      <p><button onClick={() => store.dispatch(showSidebar())}>more info</button></p>
    </Popup>
  </Marker>
)

export default GeoMarker;
