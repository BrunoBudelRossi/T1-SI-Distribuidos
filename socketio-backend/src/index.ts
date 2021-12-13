import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { AddressInfo } from "net";
import { v4 as uuid } from "uuid";
import { Socket } from "socket.io";

export const app = express();

const httpServer = createServer(app);

export const io = new Server(httpServer, { cors: { origin: "*" } });

type Task = {
    id: string;
    text: string;
    done: boolean;
};

let tasks = Array<Task>();

io.on("connection", (socket: Socket) => {
    socket.emit("loadTasks", tasks);

    socket.on("createTask", (task: Task) => {
        task.id = uuid();
        tasks.push(task);
        io.emit("createTask", task);
    });

    socket.on("toggleTask", (taskId) => {
        const index = tasks.findIndex((currTask) => currTask.id === taskId);
        tasks[index].done = !tasks[index].done;
        io.emit("loadTasks", tasks);
    });

    socket.on("deleteTask", (taskId) => {
        tasks = tasks.filter((currTask) => currTask.id !== taskId);
        io.emit("loadTasks", tasks);
    });
});

try {
    app.set("port", 3333);

    httpServer.listen(app.get("port"), () => {
        console.log(
            `Server running on ${(httpServer.address() as AddressInfo).port}`
        );
    });
} catch (err) {
    console.log(err);
    process.exit(1);
}
