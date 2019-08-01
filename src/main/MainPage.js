import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import authService from '../commons/auth.service';
import Column from "./Column";
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {normalize, schema} from 'normalizr';

const Header = styled.div``;

const ColumnsContainer = styled.div`
    display: flex;
`;

function Main() {

    const [loggingOut, setLoggingOut] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [columns, setColumns] = useState([]);
    const [columnsOrder, setColumnsOrder] = useState([]);

    useEffect(() => {
        setIsLoading(false);
        axios.all([getTasks(), getColumns()])
            .then(axios.spread((tasks, columns) => {
                // Get tasks
                const taskSchema = new schema.Entity('tasks');
                const taskListSchema = new schema.Array(taskSchema);
                const denormalizedTasks = normalize(tasks.data, taskListSchema);
                const newTasks = denormalizedTasks.entities.tasks || [];

                const columnSchema = new schema.Entity('columns');
                const columnListSchema = new schema.Array(columnSchema);
                const denormalizedColumns = normalize(columns.data, columnListSchema);
                const newColumns = denormalizedColumns.entities.columns || [];

                // Get columns
                const newColumnsOrder = columns.data.map(column => column.id);
                newColumnsOrder.map(columnId => {
                    newColumns[columnId] = {
                        ...newColumns[columnId],
                        taskIds: (newColumns[columnId].taskIds || '').split(',').filter(id => id).map(id => Number(id))
                    };
                });
                setTasks(newTasks);
                setColumns(newColumns);
                setColumnsOrder(newColumnsOrder);
            }))
            .catch(() => {

            })
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    function getTasks() {
        return axios.get('/api/v1/tasks');
    }

    function getColumns() {
        return axios.get('/api/v1/columns');
    }

    function logout() {
        authService.logout();
        setLoggingOut(true);
    }

    function updateTaskStatus() {

    }

    function onDragEnd(result) {
        const {destination, source, draggableId} = result;
        if (!destination) {
            return;
        }

        // Order doesn't change
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const startColumn = columns[source.droppableId];
        const endColumn = columns[destination.droppableId];

        if (startColumn === endColumn) {
            // Reordering within one column
            const newTaskIds = Array.from(startColumn.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...startColumn,
                taskIds: newTaskIds
            };

            setColumns({
                ...columns,
                [newColumn.id]: newColumn
            });

            updatePosition({columnId: newColumn.id, taskIds: newTaskIds.join(',')});
        } else {
            // Reordering to different column
            const startTaskIds = Array.from(startColumn.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStartColumn = {
                ...startColumn,
                taskIds: startTaskIds
            };

            const finishTaskIds = Array.from(endColumn.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newEndColumn = {
                ...endColumn,
                taskIds: finishTaskIds
            };

            setColumns({
                ...columns,
                [newStartColumn.id]: newStartColumn,
                [newEndColumn.id]: newEndColumn
            });

            updatePosition({columnId: startColumn.id, taskIds: startTaskIds.join(',')});
            updatePosition({columnId: endColumn.id, taskIds: finishTaskIds.join(',')});
        }
    }

    function updatePosition(data) {
        return axios.put('/api/v1/columns', data)
            .then((response) => {

            })
            .catch(() => {
                // TODO saniaky: handle fail
            })
            .then(() => {

            });
    }

    if (loggingOut) {
        return <Redirect to="/auth/login"/>;
    }

    return (
        <div className="container">
            <Header>
                <h2>Planner. {isLoading ? "Loading..." : ""}</h2>
                <h3>
                    <i className="fa fa-user"/> Hello {authService.getCurrentUser().fullName}
                    <span> </span>
                    <button onClick={logout}>Logout</button>
                </h3>
            </Header>

            <DragDropContext onDragEnd={onDragEnd}>
                <ColumnsContainer>
                    {columnsOrder.map((columnId) => {
                        const column = columns[columnId];
                        const columnTasks = column.taskIds.map(taskId => tasks[taskId]);
                        return <Column key={column.id} column={column} tasks={columnTasks}/>;
                    })}
                </ColumnsContainer>
            </DragDropContext>
        </div>
    );
}

export default Main;