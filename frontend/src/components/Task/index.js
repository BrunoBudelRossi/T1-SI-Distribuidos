import TrashCanIcon from "../Icons/TrashCanIcon";

import "./Task.css";

const Task = ({ id, description, done, updateTask, deleteTask, ...props }) => (
    <li className="task" {...props}>
        <input
            className="task__checkbox"
            type="checkbox"
            checked={done}
            onChange={() => updateTask(id)}
        />
        <p className="task__description">{description}</p>
        <button className="task__button" onClick={() => deleteTask(id)}>
            <TrashCanIcon />
        </button>
    </li>
);

export default Task;
