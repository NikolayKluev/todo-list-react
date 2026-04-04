import { useEffect, useState } from "react";
import { priorityLabels } from "../components/priorities";
import TaskItem from "../components/TaskItem";

const Home = () => {

    // 1. Создаем состояние для хранения массива задач
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Используем useEffect для получения данных при монтировании компонента
    useEffect(() => {

        document.title = 'Главная | ToDoList';

        const fetchTasks = async () => {
            try {

                const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);

                if (!response.ok) {
                    throw new Error('Не удалось получить задачи с сервера');
                }

                const data = await response.json(); // Преобразуем ответ в JSON
                setTasks(data); // Сохраняем задачи в состояние
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
        // Зависимости пустые [], значит эффект сработает только один раз при загрузке
    }, []);

    const handleDelete = async (taskId) => {
        try {
            // Отправляем DELETE-запрос на сервер
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Не удалось удалить задачу');
            }

            // Если запрос успешен, обновляем состояние.
            // Мы фильтруем текущий массив задач, удаляя ту, чей id совпал.
            setTasks(tasks.filter(task => task.id !== taskId));

        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <section>
            <div className='container'>
                <h2>Список задач</h2>

                {isLoading && <p>Загрузка задач...</p>}

                {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}

                {/* Проверяем, есть ли задачи */}
                {!isLoading && !error && tasks.length === 0 && <p>Задач пока нет. Добавьте новую!</p>}

                {/* Отрисовываем список задач */}
                <ul>
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id} // Ключ по-прежнему нужен для списка
                            task={task}
                            priorityLabels={priorityLabels}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </div>

        </section>
    );
};

export default Home;





