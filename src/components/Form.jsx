import { useEffect, useState } from 'react'
// import Input from './Input'
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
		switch (field.type) {
			case 'textarea':
				return (
					<TextareaInput
						key={field.name}
						{...field}
						value={formData[field.name] || ''}
						onChange={(value) => handleInputChange(field.name, value)}
					/>
				)
			case 'checkbox':
				return (
					<CheckboxInput
						key={field.name}
						{...field}
						value={formData[field.name] || false}
						onChange={(value) => handleInputChange(field.name, value)}
					/>
				)
			case 'select':
				return (
					<SelectInput
						key={field.name}
						{...field}
						value={formData[field.name] || ''}
						options={field.options}
						onChange={(value) => handleInputChange(field.name, value)}
					/>
				)
			default:
				return (
					<TextInput
						key={field.name}
						{...field}
						value={formData[field.name] || ''}
						onChange={(value) => handleInputChange(field.name, value)}
					/>
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
								{schema.fields.map((field) =>
									// <Input
									// 	key={field.name}
									// 	{...field}
									// 	value={formData[field.name] || ''}
									// 	onChange={(value) => handleInputChange(field.name, value)}
									// />
									renderInput(field)
								)}
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
