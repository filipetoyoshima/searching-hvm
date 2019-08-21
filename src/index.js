import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home/Home';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import configureStore from "./store/index";

ReactDOM.render(
    <Provider store={configureStore()}>
        <Home />
    </Provider>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
