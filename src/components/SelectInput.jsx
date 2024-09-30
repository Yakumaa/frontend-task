const SelectInput = ({ name, label, required, value, onChange, options }) => {
	return (
		<div className="w-full">
			<label htmlFor={name} className="mb-2.5 block text-black dark:text-white">
				{label}
			</label>
			<select
				id={name}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				required={required}
				className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}

export default SelectInput
