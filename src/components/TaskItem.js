import React from 'react';
import { Link } from 'react-router-dom';
import { executors } from './Executors';

// Компонент принимает задачу и функцию удаления в качестве пропсов
const TaskItem = ({ task, priorityLabels, handleDelete }) => {


  return (
    <li key={task.id}>
      <div>
        <Link to={`/task/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h4>{task.title}</h4>
          <p className="text-content">{task.description}</p>

          {/* Блок для отображения исполнителей */}
          {task.executors && task.executors.length > 0 ? ( // Проверка на существование и непустой массив
            <><strong className='text-content'>
              Исполнители:{" "}
            </strong><p>
                {task.executors
                  .map(id => executors[id] || 'Неизвестный') // защита на случай несуществующего ID
                  .join(', ')}
              </p></>
          ) : (
            <p className='text-content'>Исполнители не назначены</p> // Текст по умолчанию
          )}


          <strong>Приоритет: </strong> <em>{priorityLabels[task.priority]}</em>
        </Link>
      </div>
      <button className="bt-del" onClick={() => handleDelete(task.id)}>Удалить</button>
    </li>
  );
};

export default TaskItem;