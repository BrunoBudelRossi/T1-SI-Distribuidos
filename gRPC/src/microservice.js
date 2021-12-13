const grpc = require("grpc");
const todoProto = grpc.load("./src/todo.proto");
const server = new grpc.Server();

const tasks = [
    { id: 1, text: "Task 1", done: false },
    { id: 2, text: "Task 2", done: false },
    { id: 3, text: "Task 3", done: true },
];

const changeData = (id, text, done) => {
    if (!text) text = "not found";
    let res = { id, done, done: false };

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].done = done;
            res = tasks[i];
            break;
        }
    }
    return res;
};

server.addService(todoProto.Todo.service, {
    insert: (err, callback) => {
        let task = call.request;
        let data = changeData(tasks.length + 1, task.text, false);
        if (task.text) {
            tasks.push(data);
            callback(null, data);
        }
    },
    list: (err, callback) => {
        callback(null, tasks);
    },
    update: (err, callback) => {
        let task = call.request;
        callback(null, changeData(task.id, task.text, task.done)); // verificar funcionamento do parametro text
    },
});

server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at 127.0.0.1:50051");
server.start();
