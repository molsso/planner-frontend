import React, {useState} from "react";
import './Panel.css';
import formatDate from "../formatDate";

function Panel({title}) {

    const [tasks, setTasks] = useState([]);
    const [description, setDescription] = useState("");
    const [isAddingMode, setIsAddingMode] = useState(false);

    function addTask() {
        setIsAddingMode(false);
        const newTask = {
            id: Math.round(Math.random() * 1000),
            description: description,
            status: "TODO",
            createdAt: new Date()
        };
        setTasks(tasks.concat([newTask]));
        setDescription("");
    }

    function cancel() {
        setIsAddingMode(false);
        setDescription("");
    }

    return (
        <div className="gray">
            <h3>{title}</h3>

            <hr/>

            <div className="panel">
                {tasks.map(t =>
                    <div key={t.id} className="panel-card">
                        <div>{t.description}</div>
                        <div className="created-at">Created: {formatDate(t.createdAt)}</div>
                    </div>
                )}
            </div>

            {isAddingMode &&
            <div>
                        <textarea
                            placeholder="Enter title for a new task"
                            onChange={e => setDescription(e.target.value)}
                            className="card-textfield"
                            value={description}
                        />

            </div>
            }

            {isAddingMode &&
            <div>
                <button className="btn btn-success" onClick={addTask}>add</button>
                <span> </span>
                <button className="btn btn-danger" onClick={cancel}>cancel</button>
            </div>
            }

            {!isAddingMode &&
            <button className="btn btn-secondary" onClick={() => setIsAddingMode(true)}>
                Add card
            </button>
            }
        </div>
    );
}


export default Panel;