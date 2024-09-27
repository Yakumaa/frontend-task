const Input = ({ type, name, label, placeholder, required, value, onChange }) => {
	const handleChange = (e) => {
		onChange(e.target.value)
	}

	const renderInput = () => {
		switch (type) {
			case 'textarea':
				return (
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
				)
			case 'checkbox':
				return (
					<input
						type="checkbox"
						id={name}
						name={name}
						checked={value}
						onChange={handleChange}
						required={required}
						className="mr-2"
					/>
				)
			default:
				return (
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
				)
		}
	}

	return (
		<div className="w-full">
			<label htmlFor={name} className="mb-2.5 block text-black dark:text-white">
				{type === 'checkbox' ? (
					<div className="flex items-center">
						{renderInput()}
						<span>{label}</span>
					</div>
				) : (
					<>{label}</>
				)}
			</label>
			{type !== 'checkbox' && renderInput()}
		</div>
	)
}

export default Input
