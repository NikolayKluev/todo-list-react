import React from "react";
import { useState, useEffect } from "react";


const ExecutorsSelector = ({ label, selectedIds = [], onChange }) => {

    const [executors, setExecutors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/executors')
            .then(res => res.json())
            .then(data => setExecutors(data));
    }, []);

    const handleChange = (event) => {
        const executorId = event.target.value;
        const isChecked = event.target.checked;

        // Создаем НОВЫЙ массив на основе текущего selectedIds
        let newSelectedIds;
        if (isChecked) {
            // Добавляем ID в массив
            newSelectedIds = [...selectedIds, executorId];
        } else {
            // Удаляем ID из массива
            newSelectedIds = selectedIds.filter(id => id !== executorId);
        }

        // Вызываем функцию onChange и передаем новый массив родителю
        onChange(newSelectedIds);
    };

    return (
        <div className="container">
            <label>{label}</label>
            <div className="executors">
                {
                    executors.map((exec) => {
                        // Проверяем, есть ли текущий ID в массиве selectedIds, который пришел от родителя
                        const isChecked = selectedIds.includes(exec.id);

                        return (
                            <div key={exec.id} className="executor-item">
                                <input
                                    type="checkbox"
                                    id={`executor-${exec.id}`}
                                    value={exec.id}
                                    checked={isChecked}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`executor-${exec.id}`}>{exec.name}</label>
                            </div>
                        );
                    })
                }
            </div>
        </div>

    );
};

export default ExecutorsSelector;