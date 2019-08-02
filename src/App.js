import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./main/MainPage";
import Login from "./auth/LoginPage";
import Signup from "./auth/SignupPage";
import PrivateRoute from "./commons/PrivateRouter";
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import './App.css';
import axios from "axios";
//import authService from "./commons/auth.service";

function App({history}) {

    axios.interceptors.response.use(response => response, error => handleAjaxError(error));

    function handleAjaxError(error) {
        if (!error.config.url.includes('/auth/')) {
            if (error.response.status === 401 || error.response.status === 403) {
                alert("Your session is expired.");
                authService.logout();
                history.push('/auth/login');
            }
        }
        return Promise.reject(error);
    }

    return (
        <Router>
            <PrivateRoute path="/" exact component={Main}/>
            <Route path="/auth/login" component={Login}/>
            <Route path="/auth/signup" component={Signup}/>
        </Router>
    );
}

export default App;
