
const PrioritySelector = ({ label, name, value, onChange }) => {

    const handleChange = (event) => {
        // Получаем значение из события...
        const newValue = event.target.value;
        // ...и вызываем родительский onChange, передавая ему ИМЯ и ЗНАЧЕНИЕ!
        onChange(name, newValue);
    };

    return (
        <div className="priority-selector">
            <label htmlFor={name}>{label}</label>
            <select name="prioritySelector" value={value} onChange={handleChange}>
                <option value="high">Высокий</option>
                <option value="middle">Средний</option>
                <option value="low">Низкий</option>
            </select>
        </div>
    );
};

export default PrioritySelector;