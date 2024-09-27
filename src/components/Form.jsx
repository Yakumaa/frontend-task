import { useState } from 'react'
import Input from './Input'

const Form = ({ schema }) => {
	const [formData, setFormData] = useState({})

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
								{schema.fields.map((field) => (
									<Input
										key={field.name}
										{...field}
										value={formData[field.name] || ''}
										onChange={(value) => handleInputChange(field.name, value)}
									/>
								))}
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
