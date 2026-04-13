import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import InputTextArea from "../components/InputTextArea";
import PrioritySelector from "../components/PrioritySelector";
import ExecutorsSelector from "../components/ExecutorsSelector";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
    useEffect(() => {
        document.title = 'Создать задание | ToDoList';
    }, []); // Добавим пустой массив зависимостей для чистоты

    const navigate = useNavigate();

    // хук введенных данных 
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        executors: [], // Теперь это часть основного состояния
        priority: 'high',
    });


    // 3. Функция ввода данных (остается почти без изменений)
    const handleInputChange = (name, value) => {
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // 4. Обновляем handleExecutorsChange, чтобы он обновлял основное состояние
    const handleExecutorsChange = (selectedIds) => {
        console.log('Выбраны исполнители с ID:', selectedIds);
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
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData) // Здесь теперь всегда актуальные данные
            });

            if (response.ok) {
                alert('Форма успешно отправлена!');
                // Сбрасываем форму (теперь это просто сброс одного состояния)
                setFormData({
                    title: '',
                    description: '',
                    executors: [],
                    priority: 'high',
                });
            } else {
                alert('Ошибка при отправке формы.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при отправке формы.');
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
                    onChange={handleInputChange} 
                />
                <InputTextArea 
                    label="Описание" 
                    type="text" 
                    name="description" 
                    placeholder="Опишите задание" 
                    onChange={handleInputChange} 
                />
                
                <ExecutorsSelector label="Исполнители:" onChange={handleExecutorsChange}/>
                                
                <PrioritySelector 
                    label="Приоритет" 
                    name="priority" 
                    value={formData.priority} 
                    onChange={handlePriorityChange} 
                />

                <button className="bt-add" type="submit">Добавить задание</button>
            </form>
            <button onClick={() => navigate(-1)} className='bt-cancel'>Назад к списку</button>
        </div>
    );
};

export default CreateTask;