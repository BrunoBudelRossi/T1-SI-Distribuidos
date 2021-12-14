import TrashCanIcon from "../Icons/TrashCanIcon";

import "./Task.css";

const Task = ({ id, description, done, updateTask, deleteTask, ...props }) => (
  <li className="task" {...props}>
    <div className="task__checkbox-wrapper">
      <input
        id={id}
        name="checkbox"
        className="task__checkbox"
        type="checkbox"
        checked={done}
        onChange={() => updateTask(id)}
      />
      <label htmlFor={id} className="task__checkbox-label"></label>
    </div>
    <p className="task__description">{description}</p>
    <button className="task__button" onClick={() => deleteTask(id)}>
      <TrashCanIcon />
    </button>
  </li>
);

export default Task;
