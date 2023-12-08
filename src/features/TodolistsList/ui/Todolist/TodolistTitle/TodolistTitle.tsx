import {EditableSpan} from "../../../../../common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import React from "react";

export const TodolistTitle = ()=> {
    return (
        <>
            <h3>
                <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
        </>
    )
}