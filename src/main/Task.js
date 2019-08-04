import React, {useState} from 'react';
import styled from 'styled-components';
import {Draggable} from "react-beautiful-dnd";
import moment from "moment";

const Container = styled.div`
    border: 1px solid black;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    border-style: ${props => (props.isDragging ? 'dotted' : 'solid')}
    background-color: ${props => (props.isDragging ? '#edf5ff' : 'white')};
`;

const Content = styled.div`
    
`;

const Meta = styled.div`
    font-size: 12px;
    font-color: grey;
    font-style: italic;
`;

const Actions = styled.div`
    
`;

const Textarea = styled.textarea`
    width: 100%;
`;

export default function Task({task, index, onSave, onDelete}) {

    const [isEditMode, setIsEditMode] = useState(false);
    const [newContent, setNewContent] = useState("");

    function saveTask() {
        onSave(task.id, newContent);
        setIsEditMode(false);
        setNewContent("");
    }

    function editTask() {
        setNewContent(task.description);
        setIsEditMode(true);
    }

    function cancelEdit() {
        setNewContent("");
        setIsEditMode(false);
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >

                    {!isEditMode &&
                    <div>
                        <Content>{task.description}</Content>
                        <Meta>
                            <div>
                                Created: {moment(task.createdAt).format('D MMM YYYY, HH:mm')}<br/>
                                <span>Updated at: {moment(task.updatedAt).format('D MMM YYYY, HH:mm')}</span>
                            </div>
                            <div>Author: {task.authorName}</div>
                        </Meta>
                        <Actions>
                            <button className="btn btn-sm btn-success" onClick={editTask}>Edit</button>
                            <span> </span>
                            <button className="btn btn-sm btn-warning" onClick={() => onDelete(task.id)}>Delete</button>
                        </Actions>
                    </div>
                    }

                    {isEditMode &&
                    <div>
                        <Textarea value={newContent} onChange={e => setNewContent(e.target.value)}/>
                        <button className="btn btn-sm btn-success" onClick={saveTask}>Save</button>
                        <span> </span>
                        <button className="btn btn-sm btn-secondary" onClick={() => cancelEdit()}>Cancel</button>
                    </div>
                    }
                </Container>
            )}
        </Draggable>
    )
}