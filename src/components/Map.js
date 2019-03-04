import React from 'react';
import styled from "styled-components";
import {Map as LeafMap, TileLayer} from "react-leaflet";
import GeoMarker from './GeoMarker';


const MapContainer = styled(LeafMap)`
    width: 100%;
    height: 100vh;
    position:absolute;
    top:0px;
    left:0px;
`;

const Map = ({position, store}) => {
  const { locations, sidebar} = store.getState();

  const mapStyle = {
    width: sidebar ? 'calc(100vw - 300px)' : '100%',
    left: sidebar ? '300px' : '0px'
  };
  
  return (
    <MapContainer style={mapStyle} center={position} zoom={6}>
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains='abcd'
        maxZoom={19}
      />
      {locations.map(loc => 
        <GeoMarker
          key={loc.info.id} 
          loc={loc} 
          store={store}
        />
      )}  
    </MapContainer>
  );
}

export default Map;

