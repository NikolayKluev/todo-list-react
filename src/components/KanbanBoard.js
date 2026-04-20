import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import { statusOrder, statusLabels } from './statuses'; // Импортируем НОВЫЙ файл
import { priorityLabels } from './priorities'; // Импортируем СТАРЫЙ файл без изменений

const KanbanBoard = ({ tasks, onTaskUpdate }) => {
  // Группируем задачи по статусу (из нового файла)
  const tasksByStatus = statusOrder.reduce((acc, status) => {
    acc[status] = tasks.filter(task => task.status === status);
    return acc;
  }, {});

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || 
        (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const taskToUpdate = tasks.find(task => task.id === parseInt(draggableId));
    
    // Меняем только статус (название колонки)
    const newStatus = destination.droppableId;

    onTaskUpdate({ ...taskToUpdate, status: newStatus });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="kanban-board">
        {statusOrder.map((status) => ( // Используем порядок из нового файла
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div 
                className="kanban-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>{statusLabels[status]}</h2> {/* Используем подписи из нового файла */}
                {tasksByStatus[status].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {/* TaskItem будет использовать старый priorities.js для отображения приоритета */}
                        <TaskItem task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;