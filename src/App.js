import React from 'react';
import Panel from "./panel/Panel";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Main from "./main/MainPage";
import Login from "./auth/LoginPage";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
    return (
        <Router>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Planner</h1>
                    </div>
                </div>

                <div className="row">
                    <Panel title="To Do"/>
                    <Panel title="In Progress"/>
                    <Panel title="Done"/>
                </div>

                <Route path="/" exact component={Main}/>
                <Route path="/login/" component={Login}/>
            </div>
        </Router>
    );
}

export default App;
