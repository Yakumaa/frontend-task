import { useEffect, useState } from 'react'
import TextInput from './TextInput'
import TextareaInput from './TextareaInput'
import CheckboxInput from './CheckboxInput'
import SelectInput from './SelectInput'

const Form = ({ schema }) => {
	const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

	useEffect(() => {
		const initialData = {}
		setFormData(initialData)
    setErrors({})
	}, [schema])

  const validateField = (field, value) => {
    if (!field.validation) return ''

    const { validation } = field
    let error = ''

    switch (field.type) {
      case 'text':
        if (validation.minLength && value.length < validation.minLength) {
          error = `${field.label} must be at least ${validation.minLength} characters`
        } else if (validation.maxLength && value.length > validation.maxLength) {
          error = `${field.label} must be no more than ${validation.maxLength} characters`
        } else if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
          error = `${field.label} is not in a valid format`
        }
        break
      case 'textarea':
        if (validation.minLength && value.length < validation.minLength) {
          error = `${field.label} must be at least ${validation.minLength} characters`
        } else if (validation.maxLength && value.length > validation.maxLength) {
          error = `${field.label} must be no more than ${validation.maxLength} characters`
        }
        break
      case 'email':
        if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
          error = `${field.label} is not in a valid format`
        }
        break
      case 'date':
        if (validation.min && new Date(value) < new Date(validation.min)) {
          error = `${field.label} must be after ${validation.min}`
        } else if (validation.max && new Date(value) > new Date(validation.max)) {
          error = `${field.label} must be before ${validation.max}`
        }
        break
      case 'tel':
        if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
          error = `${field.label} is not in a valid format`
        }
        else if(validation.minLength && value.length < validation.minLength) {
          error = `${field.label} must be at least ${validation.minLength} characters`
        }
        break
      case 'password':
        if (validation.minLength && value.length < validation.minLength) {
          error = `${field.label} must be at least ${validation.minLength} characters`
        } else if (validation.maxLength && value.length > validation.maxLength) {
          error = `${field.label} must be no more than ${validation.maxLength} characters`
        } else if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
          error = `${field.label} is not in a valid format`
        } else if (validation.match && value !== formData[validation.match]) {
          error = `${field.label} must match ${validation.match}`
        }
        break
    }
    return error
  }

	const handleInputChange = (name, value) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))

    const field = schema.fields.find(f => f.name === name)
    const error = validateField(field, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
    const newErrors = {}
    schema.fields.forEach(field => {
      const error = validateField(field, formData[field.name])
      if (error) {
        newErrors[field.name] = error
      }
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData)
    } else {
      console.log('Form has errors:', newErrors)
    }
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
      error: errors[name],
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
