import React from "react";
import {TaskStatuses} from "../../../../../common/enums";
import {TodolistDomainType} from "../../../model/todolists/todolists.reducer";
import {TaskType} from "../../../api/tasks/taskApi.types";
import {Task} from "./Task/Task";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[]
};



export const Tasks = ({tasks, todolist}: Props) => {

    let tasksForTodolist = tasks;
    const {filter} = todolist

    if (filter === "active") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }
    return (
        <>
            {tasksForTodolist.map((t) => (
                <Task
                    key={t.id}
                    task={t}
                    todolistId={todolist.id}
                />
            ))}
        </>
    )
}