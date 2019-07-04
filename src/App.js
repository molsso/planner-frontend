import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Planner</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    To Do
                </div>
                <div className="col-md-4">
                    In Progress
                </div>
                <div className="col-md-4">
                    Done
                </div>
            </div>
        </div>
    );
}

export default App;
