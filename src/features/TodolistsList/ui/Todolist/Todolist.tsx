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

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[]
};


export const Todolist = React.memo(function (props: Props) {
    const {fetchTasks, addTask} = useActions(tasksThunks);
    const {changeTodolistTitle, removeTodolist} = useActions(todolistsThunks)


    useEffect(() => {
        fetchTasks(props.todolist.id);
    }, []);


    const addTaskCB = useCallback(
        (title: string)=> {
        addTask({ title, todolistId:props.todolist.id });
    }, [props.todolist.id]);


    const removeTodolistHandler = () => {
       removeTodolist(props.todolist.id);
    };

    const changeTodolistTitleHandler = useCallback(
        (title: string) => {
            changeTodolistTitle({ id: props.todolist.id, title });
        },
        [props.todolist.id],
    );



    return (
        <div>

            <AddItemForm addItem={addTaskCB} disabled={props.todolist.entityStatus === "loading"}/>
            <Tasks todolist={props.todolist} tasks={props.tasks}/>
            <div style={{paddingTop: "10px"}}>
              <FilterTasksButton todolist={props.todolist}/>
            </div>
        </div>
    );
});
