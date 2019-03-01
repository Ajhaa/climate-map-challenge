import React from 'react';
import styled from "styled-components";
import {Map as LeafMap, TileLayer} from "react-leaflet";
import GeoMarker from './GeoMarker'


const MapContainer = styled(LeafMap)`
    width: 100%;
    height: 100vh;
    position:absolute;
    top:0px;
    left:0px;
`;

const Map = ({mapStyle, position, locations, setSelectedLocation, setShowSidebar}) => (
  <MapContainer style={mapStyle} center={position} zoom={6}>
    <TileLayer
      url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      subdomains='abcd'
      maxZoom={19}
    />
    {locations.map(loc => <GeoMarker loc={loc} setSelectedLocation={setSelectedLocation} setShowSidebar={setShowSidebar}/>)}
  </MapContainer>
);

export default Map;

