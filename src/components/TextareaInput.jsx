import { useState } from "react";

const TextareaInput = ({ name, label, placeholder, required, validation, onValidChange }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validateField = (fieldValue) => {
    if (!validation) return "";

    let errorMessage = "";

    if (validation.minLength && fieldValue.length < validation.minLength) {
      errorMessage = `${label} must be at least ${validation.minLength} characters`;
    } else if (validation.maxLength && fieldValue.length > validation.maxLength) {
      errorMessage = `${label} must be no more than ${validation.maxLength} characters`;
    }

    return errorMessage;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    const newError = validateField(newValue);
    setError(newError);
    onValidChange(name, newValue, newError === "");
  };

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-2.5 block text-black dark:text-white"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleChange}
        rows={6}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextareaInput;
