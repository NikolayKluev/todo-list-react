import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { useState, useEffect } from 'react';
import { showConfirmWithoutNav } from '../components/ShowConfirm';

function ExecutorsCrDel() {

    const [executors, setExecutors] = useState([]);
    // const [newName, setNewName] = useState('');
    const [inputData, setInputData] = useState({
        name: ''
    });

    useEffect(() => {
        document.title = 'Список исполнителей | ToDoList';

        fetch('http://localhost:3001/executors')
            .then(res => res.json())
            .then(data => setExecutors(data));

    }, []);

    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setInputData(prevData => ({ ...prevData, [name]: value }));
    };


    // Добавление
    const handleAdd = () => {
        if (!inputData.name.trim()) {
            console.warn('name is null');
            return;
        }

        const newExecutor = { name: inputData.name };

        fetch('http://localhost:3001/executors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newExecutor),
        })
            .then(res => res.json())
            .then(savedData => {
                setExecutors([...executors, savedData]); // Обновляем локальный список
                setInputData({ name: '' });
            });
    };

    // Удаление
    const handleDelete = (id) => {
        fetch(`http://localhost:3001/executors/${id}`, {
            method: 'DELETE'
        }).then(() => {
            // Оптимистичное обновление интерфейса
            setExecutors(executors.filter(e => e.id !== id));
        });
    };

    return (
        <div className='container'>
            <h2>Список исполнителей:</h2>
            <div className='container-exec'>
                
                <ul className='list-execut'>
                    {executors.map(exec => (
                        <li className='execut' key={exec.id}>
                            {exec.name}
                            <button className='bt-del-exec' onClick={() => showConfirmWithoutNav(() => handleDelete(exec.id))}>
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>

                <div className='list-execut'>
                    <InputField
                        label='Добавить исполнителя'
                        placeholder='Введите имя исполнителя'
                        name='name'
                        type='text'
                        value={inputData.name}
                        onChange={handleInputChange} />
                    <button className='bt-add-exec' onClick={handleAdd}>Добавить</button>
                </div>
            </div>
            <button onClick={() => navigate('/')} className='bt-cancel'>Назад к списку</button>
        </div>
    );
}

export default ExecutorsCrDel;
