import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { AddressInfo } from "net";
import { v4 as uuid } from "uuid";
import { Socket } from "socket.io";
import redis from "./redis"

(async () => {
    redis.on('error', (err) => console.log('Redis Client Error', err));

    await redis.connect();
})()

export const app = express();

const httpServer = createServer(app);

export const io = new Server(httpServer, { cors: { origin: "*" } });

type Task = {
    id: string;
    text: string;
    done: boolean;
};

let tasks = Array<Task>();



io.on("connection", async (socket: Socket) => {
    const getTasks = async () => {
        const keys = (await redis.keys("task:*"))
        const values = (await Promise.all(keys.map(async (key) => JSON.parse(<string> await redis.get(key))))).sort((f, s) => f.text > s.text ? 1 : -1)

        socket.emit("loadTasks", values);
    }

    await getTasks()
    
    socket.on("createTask", async (task: Task) => {
        task.id = uuid();
        await redis.set(`task:${task.id}`, JSON.stringify(task))
        io.emit("createTask", task);
    });

    socket.on("toggleTask", async (taskId) => {
        const request = <string> await redis.get(`task:${taskId}`)
        const task: Task | null = JSON.parse(request)
        const parsed = {...task, done: !task?.done}
        await redis.set(`task:${taskId}`, JSON.stringify(parsed))
        await getTasks()
    });

    socket.on("deleteTask", async (taskId) => {
        await redis.del(`task:${taskId}`)
        await getTasks()
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
