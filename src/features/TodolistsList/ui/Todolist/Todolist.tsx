import React, {useCallback, useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {TodolistDomainType, todolistsThunks} from "features/TodolistsList/model/todolists/todolists.reducer";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import {TaskType} from "features/TodolistsList/api/tasks/taskApi.types";
import {useActions} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {FilterTasksButton} from "./FilterTaskButton/FilterTasksButton";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[]
};


export const Todolist = React.memo(function ({todolist, tasks}: Props) {
    const {fetchTasks, addTask} = useActions(tasksThunks);

    useEffect(() => {
        fetchTasks(todolist.id);
    }, []);


    const addTaskCB = useCallback(
        (title: string) => {
           return  addTask({title, todolistId: todolist.id}).unwrap();
        }, [todolist.id]);


    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCB} disabled={todolist.entityStatus === "loading"}/>
            <Tasks todolist={todolist} tasks={tasks}/>
            <div style={{paddingTop: "10px"}}>
                <FilterTasksButton todolist={todolist}/>
            </div>
        </div>
    );
});
