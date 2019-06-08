import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import store from "./store/store";
import Login from './pages/login/Login'
import { Provider } from "react-redux";

const routing = (
  <Provider store={store}>
    <Router>
      <Route path="/app" component={App} />
      <Route exact path="/login" component={Login} />
    </Router>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
