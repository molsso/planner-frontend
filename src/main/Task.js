import React from 'react';
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

export default function Task({task, index, onDelete}) {

    function editTask() {

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

                    <Content>{task.description}</Content>
                    <hr/>
                    <Meta>
                        <div>Created: {moment(task.createdAt).format('D MMM YYYY, HH:mm')}</div>
                        <div>Author: {task.authorName}</div>
                    </Meta>
                    <Actions>
                        <button className="btn btn-sm btn-info" onClick={editTask}>Edit</button>
                        <span> </span>
                        <button className="btn btn-sm btn-warning" onClick={() => onDelete(task.id)}>Delete</button>
                    </Actions>
                </Container>
            )}
        </Draggable>
    )
}