import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Panel from "./panel/Panel";

function App() {
    return (
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
        </div>
    );
}

export default App;
