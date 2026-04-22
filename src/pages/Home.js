import React, { useState, useEffect } from 'react';
import KanbanBoard from '../components/KanbanBoard';

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    document.title = 'Главная | ToDoList';

    const fetchTasks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        setTasks(data);
      } catch (e) {
        console.error("Ошибка загрузки задач:", e);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Ошибка удаления');
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error('Не удалось удалить задачу:', error);
    }
  };

  const handleTaskUpdate = async (updatedTask) => {
    // console.log('handleTaskUpdate called', updatedTask);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error('Ошибка обновления');
      const saved = await response.json();
      setTasks(prev => prev.map(task => (task.id === saved.id ? saved : task)));
    } catch (error) {
      console.error('Не удалось обновить задачу:', error);
    }
  };

  return (
    <div>
      <KanbanBoard tasks={tasks} onTaskUpdate={handleTaskUpdate} onDelete={handleDelete} />
    </div>
  );
}

export default Home;