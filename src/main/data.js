const initialData = {
    tasks: {
        'task-1': {
            id: 'task-1',
            content: 'hello task 1'
        }
    },
    columns: {
        'TODO': {
            id: 'TODO',
            title: 'To Do',
            taskIds: []
        },
        'IN_PROGRESS': {
            id: 'IN_PROGRESS',
            title: 'In Progress',
            taskIds: []
        },
        'DONE': {
            id: 'DONE',
            title: 'Done',
            taskIds: []
        }
    },
    columnsOrder: ['TODO', 'IN_PROGRESS', 'DONE']
};

export default initialData;