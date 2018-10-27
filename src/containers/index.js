import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App';
import App1 from './Containers/App.1';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App1 />,<App />, document.getElementById('root,root1'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
