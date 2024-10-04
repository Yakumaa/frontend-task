const TextInput = ({ type, name, label, placeholder, required, value, onChange, error }) => {
	const handleChange = (e) => onChange(e.target.value)

	return (
		<div className="w-full">
			<label htmlFor={name} className="mb-2.5 block text-black dark:text-white">
				{label}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				required={required}
				value={value}
				onChange={handleChange}
				className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
			/>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	)
}

export default TextInput
