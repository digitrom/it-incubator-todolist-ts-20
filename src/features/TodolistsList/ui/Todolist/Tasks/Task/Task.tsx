import React, {ChangeEvent} from "react";
import {TaskStatuses} from "common/enums";
import {TaskType} from "../../../api/tasks/taskApi.types";
import {useActions} from "../../../../../common/hooks";
import {tasksThunks} from "../../../model/tasks/tasksSlice";
import s from './Task.module.css'
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "../../../../../common/components";
import {Checkbox, IconButton} from "@mui/material";

type Props= {
    task: TaskType;
    todolistId: string;
}


// const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
//     updateTask({ taskId, domainModel: { title }, todolistId });
// }, []);

export const Task = React.memo(({task, todolistId}:Props) => {
    const {removeTask, updateTask} = useActions(tasksThunks)
    const removeTaskHandler = () => removeTask({taskId: task.id, todolistId: todolistId});
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask
        ({
            taskId: task.id,
            domainModel: {status},
            todolistId: todolistId
        });
    }

    const ChangeTaskTitleHandler = (title: string) => {
        updateTask({taskId: task.id, domainModel: {title}, todolistId: todolistId});
    }


    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone: ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeTaskStatusHandler}/>

            <EditableSpan value={task.title} onChange={ChangeTaskTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});
