import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Panel from "./panel/Panel";

function App() {

    const [tasks, setTasks] = useState([]);
    const [description, setDescription] = useState("");
    const [isAddingMode, setIsAddingMode] = useState(false);

    function addTask() {
        setIsAddingMode(false);
        const newTask = {
            id: null,
            description: description,
            status: "TODO",
            createdAt: new Date()
        };
        setTasks(tasks.concat([newTask]));
        setDescription("");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Planner</h1>
                </div>
            </div>
            <div className="row">
                <div className="gray">
                    <h3>To Do</h3>
                    <hr/>
                    <Panel items={tasks.filter(t => t.status === "TODO")}/>
                    {isAddingMode &&
                    <div>
                        <input
                            placeholder="text"
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                        />
                        <button className="btn btn-link" onClick={addTask}>add</button>
                    </div>
                    }
                    <button className="btn btn-secondary" onClick={() => setIsAddingMode(true)}>
                        Add card
                    </button>
                </div>
                <div className="gray">
                    <h3>In Progress</h3>
                    <hr/>
                    <Panel items={[]}/>
                </div>
                <div className="gray">
                    <h3>Done</h3>
                    <hr/>
                    <Panel items={[]}/>
                </div>
            </div>
        </div>
    );
}

export default App;
