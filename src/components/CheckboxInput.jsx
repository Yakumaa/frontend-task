const CheckboxInput = ({ type, name, label, required, value, onChange }) => {
	const handleChange = (e) => onChange(e.target.checked)

	return (
		<div className="w-full">
			<label htmlFor={name} className="mb-2.5 block text-black dark:text-white">
				<input
					type={type}
					id={name}
					name={name}
					checked={value}
					onChange={handleChange}
					required={required}
					className="mr-2"
				/>
				{label}
			</label>
		</div>
	)
}

export default CheckboxInput
