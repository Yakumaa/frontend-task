import { useEffect, useState } from 'react'
import TextInput from './TextInput'
import TextareaInput from './TextareaInput'
import CheckboxInput from './CheckboxInput'
import SelectInput from './SelectInput'

const Form = ({ schema }) => {
	const [formData, setFormData] = useState({})

	useEffect(() => {
		const initialData = {}
		schema.fields.forEach((field) => {
			initialData[field.name] = field.type === 'checkbox' ? false : ''
		})
		setFormData(initialData)
	}, [schema])

	const handleInputChange = (name, value) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(formData)
	}

	const renderInput = (field) => {
    const { name, label, type, required, placeholder, options } = field;
    const commonProps = {
      name,
      type,
      label,
      required,
      value: formData[name] || '',
      onChange: (value) => handleInputChange(name, value),
    }

		switch (field.type) {
			case 'textarea':
				return (
					<TextareaInput key={name} {...commonProps} placeholder={placeholder} />
				)
			case 'checkbox':
				return (
					<CheckboxInput key={name} {...commonProps} />
				)
			case 'select':
				return (
					<SelectInput key={name} {...commonProps} options={options} />
				)
			default:
				return (
					<TextInput key={name} {...commonProps} placeholder={placeholder} />
				)
		}
	}

	return (
		<div className="grid grid-cols-1 gap-9">
			<div className="flex flex-col gap-9">
				<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
					<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
						<h3 className="font-medium text-black dark:text-white">{schema.name}</h3>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="p-6.5">
							<div className="mb-4.5 flex flex-col gap-4">
                {schema.fields.map(renderInput)}
								<button
									type="submit"
									className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
								>
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Form
