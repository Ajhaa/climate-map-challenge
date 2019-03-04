import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'leaflet/dist/leaflet.css';

import { createStore, combineReducers } from 'redux';
import selectedReducer from './reducers/selectedReducer';
import showSidebarReducer from './reducers/showSidebarReducer';
import comparedReducer from './reducers/comparedReducer';
import locationsReducer from './reducers/locationsReducer';

import App from './App';
import * as serviceWorker from './serviceWorker';

const reducer = combineReducers({
  sidebar: showSidebarReducer,
  selected: selectedReducer,
  compared: comparedReducer,
  locations: locationsReducer
});

const store = createStore(reducer);

const renderApp = () => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}

renderApp();
store.subscribe(renderApp);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


