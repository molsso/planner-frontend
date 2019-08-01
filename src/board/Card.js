import React from 'react';
import moment from "moment";

export default function Card({task}) {
    return (
        <div
            key={task.id}
            className="panel-card"
        >
            <div>{task.description}</div>
            <div className="created-at">Created: {moment(task.createdAt).format('D MMM YYYY, HH:mm')}</div>
            <div className="created-at">Author: {task.authorName}</div>
        </div>
    )
}