import { useState } from "react";

const CheckboxInput = ({ name, label, required, onValidChange }) => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    setError("");
    onValidChange(name, newChecked, true);
  };

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-2.5 block text-black dark:text-white"
      >
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={handleChange}
          required={required}
          className="mr-2"
        />
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CheckboxInput;
