import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import InputTextArea from "../components/InputTextArea";
import PrioritySelector from "../components/PrioritySelector";
import ExecutorsSelector from "../components/ExecutorsSelector";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess, showWarning } from "../components/ToastifyComponents";

const CreateTask = () => {

    
    useEffect(() => {
        document.title = 'Создать задание | ToDoList';
    }, []);

    const navigate = useNavigate();

    // хук введенных данных 
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: '',
        executors: [], // Теперь это часть основного состояния
        priority: 'low',
        status: 'todo',
        createdAt: new Date().toLocaleString('ru-RU'),
    });

    // Функция ввода данных 
    const handleInputChange = (name, value) => {
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // 4. Обновляем handleExecutorsChange, чтобы он обновлял основное состояние
    const handleExecutorsChange = (selectedIds) => {
        // Используем setFormData вместо отдельного setExecutorsIds
        setFormData(prevData => ({
            ...prevData,
            executors: selectedIds
        }));
    };

    // 5. Обновляем handlePriorityChange по тому же принципу
    const handlePriorityChange = (name, value) => {
        // Используем setFormData вместо отдельного setTaskPriority
        setFormData(prevData => ({
            ...prevData,
            priority: value
        }));
    };


    // отправка формы (остается без изменений)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            showWarning();
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData) // Здесь теперь всегда актуальные данные
            });

            if (response.ok) {
                showSuccess();
                // Сбрасываем форму (теперь это просто сброс одного состояния)
                setFormData({
                    title: '',
                    description: '',
                    author: '',
                    executors: [],
                    priority: 'low',     
                    createdAt: '',               
                });
            } else {
                showError();
            }
        } catch (error) {
            console.error('Ошибка:', error);
            showError();
        }
    };

    return (
        <div className="container">
            <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Создать задание</h2>
                <InputField
                    label="Название"
                    type="text"
                    name="title"
                    placeholder="Введите название"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                
                <InputTextArea
                    label="Описание"
                    type="text"
                    name="description"
                    placeholder="Опишите задание"
                    value={formData.description}
                    onChange={handleInputChange}
                />

                <InputField
                    label="Автор"
                    type="text"
                    name="author"
                    placeholder="Введите автора"
                    value={formData.author}
                    onChange={handleInputChange}
                />

                <ExecutorsSelector label="Исполнители:" selectedIds={formData.executors} onChange={handleExecutorsChange} />

                <PrioritySelector
                    label="Приоритет"
                    name="priority"
                    value={formData.priority}
                    onChange={handlePriorityChange}
                />

                <button className="bt-add" type="submit">Добавить задание</button>
            </form>
            <button onClick={() => navigate('/')} className='bt-cancel'>Назад к списку</button>            
        </div>
    );
};

export default CreateTask;