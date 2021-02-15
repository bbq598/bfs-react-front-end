import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistFunc from './store/persistedStore'; // redux-persist config
import { createStore } from 'redux';
import appReducer from './reducers/reducer';
import { applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'


 // see persistedStore.js: this configs the createStore and applies middleware of choice
 // must use the store and persistor pair together
const { store, persistor } = persistFunc();
// const { persistor } = persistFunc();
// const store = createStore(appReducer, applyMiddleware(reduxThunk));

// now refreshing the page keeps the store's values
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
