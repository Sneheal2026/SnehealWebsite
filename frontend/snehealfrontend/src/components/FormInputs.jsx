import React from 'react';
import '../styles/components/FormInputs.css';

const FormInput = ({ label, type = 'text', name, value, onChange, placeholder, required = false }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name} className="form-label">{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-input"
      />
    </div>
  );
};

const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 5, required = false }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name} className="form-label">{label}</label>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="form-textarea"
      />
    </div>
  );
};

const FormSelect = ({ label, name, value, onChange, options, required = false }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name} className="form-label">{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="form-select"
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { FormInput, FormTextarea, FormSelect };
