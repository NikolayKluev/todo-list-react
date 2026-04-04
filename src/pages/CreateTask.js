import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import InputTextArea from "../components/InputTextArea";
import PrioritySelector from "../components/PrioritySelector";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {

    useEffect(() => {
        document.title = 'Создать задание | ToDoList';
    });

    const navigate = useNavigate();

    const [taskPriority, setTaskPriority] = useState('low');

    // хук введенных данных
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'high',
    });


    // функция ввода данных
    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    // Функция-обработчик, которая будет обновлять состояние
    const handlePriorityChange = (name, value) => {
        // console.log(`Поле ${name} изменено на ${value}`);
        setTaskPriority(value);        
    };


    // отправка формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на пустые поля 
        if (!formData.title.trim() || !formData.description.trim()) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Форма успешно отправлена!');
                setFormData({
                    title: '',
                    description: '',
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
                <InputField label="Название" type="text" name="title" placeholder="Введите название" onChange={handleInputChange} />
                <InputTextArea label="Описание" type="text" name="description" placeholder="Опишите задание" onChange={handleInputChange} />
                <PrioritySelector label="Приоритет" name="priority" value={taskPriority} onChange={handlePriorityChange} />

                <button className="bt-add" type="submit">Добавить задание</button>
            </form>
            <button onClick={() => navigate(-1)} className='bt-cancel'>Назад к списку</button>
        </div>

    );
};

export default CreateTask;