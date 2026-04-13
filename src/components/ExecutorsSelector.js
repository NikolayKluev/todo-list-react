import React from "react";
import { executors } from "./Executors";

// Убираем useState! Компонент теперь только рендерит то, что ему дали.
const ExecutorsSelector = ({ label, selectedIds = [], onChange }) => {

    const handleChange = (event) => {
        const executorId = parseInt(event.target.value);
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

        // Вызываем функцию onChange и передаем НОВЫЙ массив родителю
        onChange(newSelectedIds);
    };

    return (
        <div className="container">
            <label>{ label }</label>
            <div className="executors">
                {Object.entries(executors).map(([id, name]) => {
                    const idAsNumber = parseInt(id);
                    // Проверяем, есть ли текущий ID в массиве selectedIds, который пришел от родителя
                    const isChecked = selectedIds.includes(idAsNumber);

                    return (
                        <div key={idAsNumber} className="executor-item">
                            <input
                                type="checkbox"
                                id={`executor-${idAsNumber}`}
                                value={idAsNumber}
                                checked={isChecked}
                                onChange={handleChange}
                            />
                            <label htmlFor={`executor-${idAsNumber}`}>{name}</label>
                        </div>
                    );
                })}
            </div>
        </div>

    );
};

export default ExecutorsSelector;