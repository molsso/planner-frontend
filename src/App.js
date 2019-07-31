import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./main/MainPage";
import Login from "./auth/LoginPage";
import Signup from "./auth/SignupPage";
import PrivateRoute from "./commons/PrivateRouter";
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import './App.css';

function App() {
    return (
        <Router>
            <PrivateRoute path="/" exact component={Main}/>
            <Route path="/auth/login" component={Login}/>
            <Route path="/auth/signup" component={Signup}/>
        </Router>
    );
}

export default App;
