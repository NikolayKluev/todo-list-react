import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useNavigate } from 'react-router-dom';
import { priorityColors } from './priorities';

const DraggableTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    width: '100%',
  };

  const backgroundColor = priorityColors[task.priority] || priorityColors.default;

  const navigate = useNavigate();

  // Обработчик клика по карточке
    const handleClick = () => {
      navigate(`/task/${task.id}`);
    };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
    >
      <div className='task' style={{backgroundColor}}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>        
      </div>
    </div>
  );
};

export default DraggableTask;