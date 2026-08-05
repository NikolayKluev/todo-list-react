import { useState } from "react";

const InputField = ({ label, type, value, name, placeholder, onChange }) => {


    const handleChange = (event) => {
        // Он вызывает onChange, который пришел от родителя,
        // и передает ему имя поля и новое значение.
        onChange(event.target.name, event.target.value);
    };

    return (
        <div className="input-field">
            <label>{label}</label>
            <input type={type} name={name} value={value} placeholder={placeholder} onChange={handleChange} required/>
        </div>
    );
};

export default InputField;