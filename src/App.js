import React, { useEffect } from 'react';
import Metolib from '@fmidev/metolib';
import './App.css';
import L from "leaflet";
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import multipleIndeces from './utils/multipleIndeces';
import { setLocations } from './reducers/locationsReducer';


// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const App = ({store}) => {
  const observationLocations = store.getState().locations;

  const { selected, compared } = store.getState();
  if (compared && compared >= 0) {
    console.log("Comparing " + selected + " and " + compared);
  }

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

          store.dispatch(setLocations(data.locations
            .map(loc => {
              const [lat, lon] = loc.info.position.map(parseFloat);
              const temperature = loc.data.t.timeValuePairs[loc.data.t.timeValuePairs.length - 1].value;
              return {...loc, position: {lat, lon}, temperature}
            })
          ));

          connection.disconnect();
        }
      });
    }
  }, []);

  const position = [65, 26];
  const lastThrees = observationLocations.map(l => multipleIndeces(l.data.t.timeValuePairs, 49, 25, 1).map(m => m.value).filter(v => !isNaN(v)));
  const max = Math.max(...lastThrees.map(l => Math.max(...l)));
  const min = Math.min(...lastThrees.map(l => Math.min(...l)));

  return (
    <div className="App">
      <Map 
        position={position}
        store={store}
      />
      <Sidebar 
        extremes={{min, max}}
        store={store}
      />
    </div>
  );

}

export default App;