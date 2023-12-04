import React, {useCallback, useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {Task} from "./Task/Task";
import {
    TodolistDomainType,
    todolistsActions, todolistsThunks
} from "features/TodolistsList/model/todolists/todolists.reducer";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import {TaskType} from "features/TodolistsList/api/tasks/taskApi.types";
import {TaskStatuses} from "common/enums";
import {useActions} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {FilterTasksButton} from "./FilterTaskButton/FilterTasksButton";

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
            changeTodolistTitle({ id: props.todolistId, title });
        },
        [props.todolist.id],
    );

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCB} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {tasksForTodolist.map((t) => (
                    <Task
                        key={t.id}
                        task={t}
                        todolistId={props.todolist.id}
                                    />
                ))}
            </div>
            <div style={{paddingTop: "10px"}}>
              <FilterTasksButton todolist={props.todolist}/>
            </div>
        </div>
    );
});
