import React from "react";

const Input = ({ label, value, setValue }) => {
    return (
        <div>
            <label htmlFor={label}>{`${label} `}</label>
            <input
                type="text"
                id={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default Input;
