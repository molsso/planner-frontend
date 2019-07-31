import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import authService from '../commons/auth.service';
import Panel from "../panel/Panel";

function Main() {

    const [tasks, setTasks] = useState([]);
    const [loggingOut, setLoggingOut] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
        axios.get('/api/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(() => {

            })
            .then(() => {
                setIsLoading(false);
            })
    }, []);

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
                    <h2>Planner. {isLoading ? "Loading..." : ""}</h2>
                    <h3>
                        <i className="fa fa-user"/> Hello {authService.getCurrentUser().fullName}
                        <span> </span>
                        <button onClick={logout}>Logout</button>
                    </h3>
                </div>
            </div>

            <div className="row">
                <Panel tasks={tasks.filter(t => t.status === "TODO")}
                       title="To Do"
                       defaultStatus="TODO"
                       onAdd={newTask => setTasks(tasks.concat([newTask]))}
                />
                <Panel tasks={tasks.filter(t => t.status === "IN_PROGRESS")}
                       title="In Progress"
                       defaultStatus="IN_PROGRESS"
                       onAdd={newTask => setTasks(tasks.concat([newTask]))}
                />
                <Panel tasks={tasks.filter(t => t.status === "DONE")}
                       title="Done"
                       defaultStatus="DONE"
                       onAdd={newTask => setTasks(tasks.concat([newTask]))}
                />
            </div>
        </div>
    );
}

export default Main;