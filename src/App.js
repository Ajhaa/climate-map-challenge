import React, {useEffect, useState} from 'react';
import Metolib from '@fmidev/metolib';
import './App.css';
import {Map, Marker, TileLayer, Popup} from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import Sidebar from './Sidebar';

const MapContainer = styled(Map)`
    width: 100%;
    height: 100vh;
    position:absolute;
    top:0px;
    left:0px;
`;


// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


function App() {
  const [observationLocations, setObservationLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [showSidebar, setShowSidebar] = useState(false);

  const mapStyle = {
    width: showSidebar ? 'calc(100vw - 300px)' : '100%',
    left: showSidebar ? '300px' : '0px'
  };

  useEffect(function fetchObservationLocations() {
    const connection = new Metolib.WfsConnection();
    if (connection.connect('http://opendata.fmi.fi/wfs', 'fmi::observations::weather::cities::multipointcoverage')) {
      connection.getData({
        begin: Date.now() - 60e3 * 60 * 24 * 6,
        end: Date.now(),
        requestParameter: "t,snowdepth,r_1h",
        timestep: 60 * 60 * 1000,
        bbox: "20.6455928891, 59.846373196, 31.5160921567, 70.1641930203",
        callback: (data, errors) => {
          if (errors.length > 0) {

            errors.forEach(err => {
              console.error('FMI API error: ' + err.errorText);
            });
            return;
          }

          setObservationLocations(data.locations
            .map(loc => {
              const [lon, lat] = loc.info.position.map(parseFloat);
              return {...loc, position: {lat, lon}}
            })
          );

          connection.disconnect();
        }
      });
    }
  }, []);

  const loc = observationLocations.find(loc => loc.info.id === selectedLocation);


  const position = [65, 26];
  const map = (
    <MapContainer style={mapStyle} center={position} zoom={6}>
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains='abcd'
        maxZoom={19}
      />
      {observationLocations.map(loc => <Marker position={[loc.position.lon, loc.position.lat]}
                                               key={loc.info.id} onClick={() => setSelectedLocation(loc.info.id)}>
                                              <Popup>
                                                <p>{loc.info.name}, {loc.info.region}</p>
                                                <p>temperature: {loc.data.t.timeValuePairs[loc.data.t.timeValuePairs.length-1].value}°C</p>
                                                <p><a onClick={() =>setShowSidebar(true)}>more info</a></p>
                                              </Popup>
      </Marker>)}
    </MapContainer>
  );



  return (
    <div className="App">
      {map}
      <Sidebar setSelected={setShowSidebar} selectedLocationId={selectedLocation} observationLocations={observationLocations}/>
    </div>
  );

}

export default App;