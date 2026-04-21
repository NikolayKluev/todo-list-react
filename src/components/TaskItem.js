import React from 'react';
import { Link } from 'react-router-dom';
import { executors } from './Executors';
import { priorityLabels } from './priorities';

const TaskItem = ({ task, onDelete, dragHandle }) => {
  const { listeners, attributes } = dragHandle || {};

  return (
    <li>
      <div>
        <Link to={`/task/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h4>{task.title}</h4>
          <p className="text-content">{task.description}</p>

          {task.executors && task.executors.length > 0 ? (
            <>
              <strong className="text-content">Исполнители: </strong>
              <p>{task.executors.map(id => executors[id] || 'Неизвестный').join(', ')}</p>
            </>
          ) : (
            <p className="text-content">Исполнители не назначены</p>
          )}

          <strong>Приоритет: </strong>
          <em>{priorityLabels[task.priority] || 'Неизвестно'}</em>
        </Link>
      </div>
        <div>
      <button
        className="bt-del"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
      >
        Удалить
      </button>

      <div {...listeners} {...attributes} className="drag-handle">
        🟰🟰🟰🟰🟰🟰
      </div>
      </div>
    </li>
  );
};

export default TaskItem;