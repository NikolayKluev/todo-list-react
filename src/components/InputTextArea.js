import { useState } from "react";

const InputTextArea = ({ label, value, type, name, placeholder, onChange }) => {

    const handleChange = (event) => {
        onChange(event.target.name, event.target.value);
    };

    return (
        <div className="input-textarea">
            <label>{label}</label>
            <textarea type={type} name={name} value={value} placeholder={placeholder} onChange={handleChange} />
        </div>
    );
};

export default InputTextArea;