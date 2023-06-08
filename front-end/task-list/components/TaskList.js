import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

import TaskForm from "./TaskForm";
import TaskService from "../service/task-service";

import "./../style/style.css";

const TaskList = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [currentTask, setCurrentTask] = useState(null);
    const [loading, setLoading] = useState(false);
}