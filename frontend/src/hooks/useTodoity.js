import { useState, useEffect } from "react";
import useSocket from "./useSocket";

const useTodoity = () => {
  const [task, setNewTask] = useState({ text: "", done: false });
  const [tasks, setTasks] = useState([]);
  const { socket } = useSocket();

  const saveTask = (e) => {
    setNewTask({ done: false, text: e.target.value });
  };

  const createTask = (e) => {
    console.log("teste");
    e.preventDefault();

    socket.emit("createTask", task);
  };

  const updateTask = (taskId) => {
    socket.emit("toggleTask", taskId);
  };

  const deleteTask = (taskId) => {
    socket.emit("deleteTask", taskId);
  };

  useEffect(() => {
    socket.on("loadTasks", (tasks) => {
      setTasks(tasks);
    });

    socket.on("createTask", (task) => {
      setTasks((prevState) => [...prevState, task]);
    });
  }, [socket]);

  return { task, tasks, saveTask, createTask, updateTask, deleteTask };
};

export default useTodoity;
