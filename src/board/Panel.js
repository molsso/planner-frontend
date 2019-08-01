import React, {useState} from "react";
import './Panel.css';
import axios from "axios";

function Panel({title, defaultStatus, tasks, onAdd}) {

    const [description, setDescription] = useState("");
    const [isAddingMode, setIsAddingMode] = useState(false);

    //const [isLoading, setIsLoading] = useState(false);

    function addTask() {
        setDescription("");
        const newTask = {
            description: description,
            status: defaultStatus,
        };
        axios.post('/api/tasks', newTask)
            .then(response => {
                onAdd(response.data);
            })
            .catch(() => {

            })
            .then(() => {
                setIsAddingMode(false);
            })
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
                {/*{tasks.map(t =>*/}
                {/*    <Card key={t.id} task={t}/>*/}
                {/*)}*/}
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