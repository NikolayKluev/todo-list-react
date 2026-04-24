import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import InputTextArea from '../components/InputTextArea';
import PrioritySelector from '../components/PrioritySelector';
import { priorityLabels } from '../components/priorities';
import { executors } from '../components/Executors';
import ExecutorsSelector from '../components/ExecutorsSelector';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { showErrNetwork, showErrSave, showSuccess } from '../components/ToastifyComponents';


function TaskDetails() {
    // Получаем ID из URL
    const { id } = useParams();
    const navigate = useNavigate();

    // Состояние для данных задачи
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Состояние для режима редактирования
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

    // Обработчик для ExecutorsSelector (он передает МАССИВ)
    const handleExecutorsChange = (newExecutorIds) => {
        setTask(prev => ({
            ...prev,
            executors: newExecutorIds
        }));
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
                showSuccess();
            } else {
                showErrSave();
            }
        } catch (err) {
            showErrNetwork();
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Ошибка удаления');
            //   setTasks(prev => prev.filter(task => task.id !== id));
        } catch (error) {
            console.error('Не удалось удалить задачу:', error);
        }
    };

    const showConfirm = () => {
        confirmAlert({
            title: 'Подтверждение действия',
            message: 'Вы уверены, что хотите удалить этот элемент?',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => {
                        handleDelete();
                        navigate(-1);
                    }
                },
                {
                    label: 'Нет',
                    onClick: () => { console.log('Отмена удаления'); }
                }
            ]
        });
    };

    if (isLoading) return <p>Загрузка задачи...</p>;
    if (!task) return <p>Задача не найдена.</p>;

    return (
        <div className='container'>
            <h2>{isEditing ? 'Редактирование задачи' : 'Просмотр задачи'}</h2>

            <div className='container-item'>
                <h4>Название: </h4>
                {isEditing ? (
                    <InputField type="text" name="title" value={task.title}
                        placeholder={task.title} onChange={handleFieldChange} />
                ) : (
                    <strong>{task.title}</strong>
                )}
            </div>

            <div className='container-item'>
                <h4>Описание: </h4>
                {isEditing ? (
                    <InputTextArea type="text" name="description" value={task.description}
                        placeholder={task.description} onChange={handleFieldChange} />
                ) : (
                    <p className='text-content'>{task.description}</p>
                )}
            </div>

            <div className='container-item'>
                <h4>Автор:</h4>
                <strong>{task.author}</strong>
            </div>

            <div className='container-item'>
                <h4>Исполнители: </h4>
                {isEditing ? (
                    <ExecutorsSelector
                        // Передаем текущий список исполнителей из состояния задачи
                        selectedIds={task.executors || []}
                        onChange={handleExecutorsChange}
                    />
                ) : (
                    // Блок для просмотра (режим Read-only)
                    task.executors && task.executors.length > 0 ? (
                        <p className='text-content'>
                            {task.executors.map(id => executors[id] || 'Неизвестный').join(', ')}
                        </p>
                    ) : (
                        <p className='text-content'>Исполнители не назначены</p>
                    )
                )}
            </div>

            <div className='container-item'>
                <h4>Приоритет:</h4>
                {isEditing ? (
                    <PrioritySelector name="priority" value={task.priority} onChange={handleFieldChange} />
                ) : (
                    <em>{priorityLabels[task.priority]}</em>
                )}
            </div>

            <div className='container-item'>
                <h4>Дата создания:</h4>
                <em>{task.createdAt}</em>
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
                <button className='bt-del' onClick={showConfirm}>
                    Удалить
                </button>
            </div>
        </div>
    );
}

export default TaskDetails;