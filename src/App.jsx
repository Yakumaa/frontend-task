import { useState } from 'react'
import Form from './components/Form'
import schemas from './schema'

const App = () => {
	const [selectedForm, setSelectedForm] = useState('contactForm')

	return (
		<div className="py-3 sm:max-w-xl sm:mx-auto">
			<div className="px-4 py-10 bg-white sm:rounded-3xl sm:p-20">
				<select
					value={selectedForm}
					onChange={(e) => setSelectedForm(e.target.value)}
					className="w-full mb-6 px-3 py-2 text-gray-700 border border-stroke dark:border-strokedark rounded-lg focus:outline-none focus:border-blue-500"
				>
					<option value="contactForm">Contact Form</option>
					<option value="userProfileForm">User Profile Form</option>
					<option value="jobApplicationForm">Job Application Form</option>
					<option value="signUpForm">Sign Up Form</option>
					<option value="signInForm">Sign In Form</option>
				</select>
				<Form schema={schemas[selectedForm]} />
			</div>
		</div>
	)
}

export default App
