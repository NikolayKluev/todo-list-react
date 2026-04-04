import React from 'react';
import { Link } from 'react-router-dom'; 

// Компонент принимает задачу и функцию удаления в качестве пропсов
const TaskItem = ({ task, priorityLabels, handleDelete }) => {
  return (
    <li key={task.id}>
      <div>
        <Link to={`/task/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <strong>{task.title}</strong>
          <p className="text-content">{task.description}</p>
          <em>Приоритет: {priorityLabels[task.priority]}</em>
        </Link>
      </div>
      <button className="bt-del" onClick={() => handleDelete(task.id)}>Удалить</button>
    </li>
  );
};

export default TaskItem;