import React, {useState} from 'react';
import styled from 'styled-components';
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 33%;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h3`
    padding: 8px;
`;

const TaskList = styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 100px;
    background-color: ${props => (props.isDraggingOver ? '#eeeeee' : 'white')};
`;

const Actions = styled.div`
    padding: 8px;
`;

function Column({column, tasks, onDelete, onAdd, onSave}) {

    const [isAddingMode, setIsAddingMode] = useState(false);
    const [description, setDescription] = useState('');

    function addTask() {
        onAdd({description: description}, column.id);
        cancel();
    }

    function cancel() {
        setIsAddingMode(false);
        setDescription("");
    }

    return (
        <Container>
            <Title>{column.title}</Title>

            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <TaskList
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id}
                                  task={task}
                                  index={index}
                                  onSave={(taskId, newContent) => onSave(taskId, newContent)}
                                  onDelete={(taskId) => onDelete(taskId, column.id)}
                            />
                        ))}

                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>

            <hr/>

            <Actions>
                {isAddingMode &&
                <div>
                    <textarea
                        style={{width: '100%'}}
                        placeholder="Enter title for a new task"
                        onChange={e => setDescription(e.target.value)}
                        className="card-textfield"
                        value={description}
                    />
                    <div>
                        <button className="btn btn-success" onClick={addTask}>add</button>
                        <span> </span>
                        <button className="btn btn-danger" onClick={cancel}>cancel</button>
                    </div>
                </div>
                }
                {!isAddingMode &&
                <button className="btn btn-sm btn-secondary" onClick={() => setIsAddingMode(true)}>
                    Add card
                </button>
                }
            </Actions>
        </Container>
    );
}

export default Column;