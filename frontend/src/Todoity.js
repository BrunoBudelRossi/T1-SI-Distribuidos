import Task from "./components/Task";
import { getToday } from "./utils";

import "./Todoity.css";

import useTodoity from "./hooks/useTodoity";

export default function App() {
    const { task, tasks, saveTask, createTask, updateTask, deleteTask } =
        useTodoity({ type: "socket" });

    return (
        <div className="todoity">
            <header className="todoity__header">
                <h1 className="todoity__title">Todoity</h1>
                <form className="todoity__form" onSubmit={createTask}>
                    <input
                        className="todoity__input"
                        placeholder="Insira a descrição de sua tarefa..."
                        type="text"
                        name="create-todo"
                        id="todo"
                        value={task.text}
                        onChange={saveTask}
                    />
                    <button className="todoity__button" type="submit">
                        Adicionar tarefa
                    </button>
                </form>
            </header>
            <main className="todoity__content">
                <h2 className="todoity__date">{getToday()}</h2>
                <ul className="todoity__tasks">
                    {tasks?.map((task) => (
                        <Task
                            key={task.id}
                            id={task.id}
                            description={task.text}
                            done={task.done}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />
                    ))}
                </ul>
            </main>
        </div>
    );
}
