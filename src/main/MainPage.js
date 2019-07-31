import React, {useState} from 'react';
import authService from '../commons/auth.service';
import Panel from "../panel/Panel";
import {Redirect} from "react-router-dom";

function Main() {

    const [loggingOut, setLoggingOut] = useState(false);

    function logout() {
        authService.logout();
        setLoggingOut(true);
    }

    if (loggingOut) {
        return <Redirect to="/auth/login"/>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Planner.</h2>
                    <h3>
                        <i className="fa fa-user"/> Hello {authService.getCurrentUser().fullName}
                        <span> </span>
                        <button onClick={logout}>Logout</button>
                    </h3>
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

export default Main;