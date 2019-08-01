import React from 'react';
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

function Column({column, tasks, onDelete}) {

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
                                  onDelete={(taskId) => onDelete(taskId, column.id)}
                            />
                        ))}

                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>

            {/*{isAddingMode &&*/}
            {/*<div>*/}
            {/*    <button className="btn btn-success" onClick={addTask}>add</button>*/}
            {/*    <span> </span>*/}
            {/*    <button className="btn btn-danger" onClick={cancel}>cancel</button>*/}
            {/*</div>*/}
            {/*}*/}

            {/*{!isAddingMode &&*/}
            {/*<button className="btn btn-secondary" onClick={() => setIsAddingMode(true)}>*/}
            {/*    Add card*/}
            {/*</button>*/}
            {/*}*/}
        </Container>
    );
}

export default Column;