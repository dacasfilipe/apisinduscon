import React, {useState, useEffect} from "react";
import TaskService from "../service/task-service";

const TaskForm = (props) => {
    const {task, setTask} = useState({});
    const {id,onSave} = props;

    useEffect(() => {
        if(!id) return;
        const load = async() => {
            const task = await TaskService.getTask(id);
            setTask(task);
        };
        load();
    })
}