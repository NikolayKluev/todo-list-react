import React from 'react';
import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  useDroppable,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableTask from './DraggableTask';
import { statusOrder, statusLabels } from './statuses';

// Компонент для колонки — теперь он знает, что он droppable
const KanbanColumn = ({ status, tasks, onDelete }) => {
  const { setNodeRef } = useDroppable({
    id: status, // <-- ключевое: id колонки = статус
  });

  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <div className='kanban-item-wrapper'>
      <h2>{statusLabels[status]}</h2>
      <div className='kanban-item' ref={setNodeRef}>
        <SortableContext items={columnTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {columnTasks.length > 0 ? (
            columnTasks.map((task) => (
              <DraggableTask key={task.id} task={task} onDelete={onDelete} />
            ))
          ) : (
            <div
              style={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#aaa',
                fontStyle: 'italic',
                width: '100%',
              }}
            >
              Пока пусто
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};

const KanbanBoard = ({ tasks, onTaskUpdate, onDelete }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {      
      return;
    }

    const newStatus = over.id;

    if (statusOrder.includes(newStatus)) {
      const taskToUpdate = tasks.find((task) => task.id === active.id);
      if (taskToUpdate && taskToUpdate.status !== newStatus) {
        console.log(`Задача ${taskToUpdate.id} перемещена из "${taskToUpdate.status}" в "${newStatus}"`);
        onTaskUpdate({ ...taskToUpdate, status: newStatus });
      }
    } else {
      console.warn(`Перетаскивание в недопустимую зону: over.id = ${newStatus}`);
      console.log('Допустимые статусы:', statusOrder);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {tasks.length > 0 ? (
          statusOrder.map((status) => (
            <KanbanColumn key={status} status={status} tasks={tasks} onDelete={onDelete} />
          ))
        ) : (
          <p>Задач нет</p>
        )}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;