import React from 'react';
import styled from 'styled-components';
import {Draggable} from "react-beautiful-dnd";

const Container = styled.div`
    border: 1px solid black;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    border-style: ${props => (props.isDragging ? 'dotted' : 'solid')}
    background-color: ${props => (props.isDragging ? '#edf5ff' : 'white')};
`;

export default function Task({task, index}) {

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >

                    <div>{task.description}</div>
                    {/*<div className="created-at">Created: {moment(task.createdAt).format('D MMM YYYY, HH:mm')}</div>*/}
                    {/*<div className="created-at">Author: {task.authorName}</div>*/}

                </Container>
            )}
        </Draggable>
    )
}