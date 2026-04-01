import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import InputTextArea from '../components/InputTextArea';
import PrioritySelector from '../components/PrioritySelector';
import { priorityLabels } from '../components/priorities';

function TaskDetails() {
    // 1. Получаем ID из URL
    const { id } = useParams();
    const navigate = useNavigate();

    // 2. Состояние для данных задачи
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 3. Состояние для режима редактирования
    const [isEditing, setIsEditing] = useState(false);

    // Получаем данные задачи с сервера при загрузке страницы
    useEffect(() => {

        document.title = "Детали задания | ToDoList";

        const fetchTask = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
                if (!response.ok) throw new Error('Задача не найдена');
                const data = await response.json();
                setTask(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTask();
    }, [id]); // Эффект перезапустится, если id в URL изменится

    
    const handleFieldChange = (arg1, arg2) => {
        // Проверяем: если первый аргумент - это объект события (у него есть свойство target)
        if (arg1 && arg1.target) {
            // Это стандартный input/textarea из браузера
            const { name, value } = arg1.target;
            setTask(prev => ({ ...prev, [name]: value }));
        } else {
            // Это вызов от PrioritySelector, который передает (name, value)
            const fieldName = arg1;
            const newValue = arg2;
            setTask(prev => ({ ...prev, [fieldName]: newValue }));
        }
    };

    // Сохранение изменений на сервере
    const handleSave = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
                method: 'PUT', // Метод для обновления данных
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                setIsEditing(false); // Выходим из режима редактирования
            } else {
                alert('Ошибка при сохранении');
            }
        } catch (err) {
            alert('Ошибка сети');
        }
    };

    if (isLoading) return <p>Загрузка задачи...</p>;
    if (!task) return <p>Задача не найдена.</p>;

    return (
        <div className='container'>
            <h1>{isEditing ? 'Редактирование задачи' : 'Просмотр задачи'}</h1>

            <div className='container-item'>
                <label>Название: </label>
                {isEditing ? (
                    <InputField type="text" name="title" value={task.title}
                        placeholder={task.title} onChange={handleFieldChange} />
                ) : (
                    <strong>{task.title}</strong>
                )}
            </div>

            <div className='container-item'>
                <label>Описание: </label>
                {isEditing ? (
                    <InputTextArea type="text" name="description" value={task.description}
                        placeholder={task.description} onChange={handleFieldChange} />
                ) : (
                    <p className='text-content'>{task.description}</p>
                )}
            </div>

            <div className='container-item'>
                <label>Приоритет:</label>
                {isEditing ? (
                    <PrioritySelector name="priority" value={task.priority} onChange={handleFieldChange} />
                ) : (
                    <em>{priorityLabels[task.priority]}</em>
                )}
            </div>

            {/* Кнопки управления */}
            <div className='two-buttons'>
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className='bt-add'>Сохранить</button>
                        <button onClick={() => setIsEditing(false)} className='bt-cancel'>Отмена</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className='bt-add'>Редактировать</button>
                        <button onClick={() => navigate(-1)} className='bt-cancel'>Назад к списку</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default TaskDetails;