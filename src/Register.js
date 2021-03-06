import React, { useState } from "react";



export default function Register(props) {

// States for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole]=useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling the name change
const handleName = (e) => {
	setName(e.target.value);
	setSubmitted(false);
};

// Handling the email change
const handleEmail = (e) => {
	setEmail(e.target.value);
	setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
	setPassword(e.target.value);
	setSubmitted(false);
};

// Handling the role
const handleRole = (e) => {
	setRole (e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	console.log(handleSubmit)
	if (name === '' || email === '' || password === ''|| role ==='') {
	setError(true);
	} else {
		props.client.register(name, email, password , role)
	
	setSubmitted(true);
	setError(false);
	//props.changeRegister(false);
	}
};

// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<h3>User {name} successfully registered!!</h3>
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
		<h1>Please enter all the fields</h1>
	</div>
	);
};

return (
	<div className="registerbackground">
	<h3>User Registration</h3>
	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

	<form className="register" >
		
		{/* Labels and inputs for form data */}
		<label className="label">Name</label> 
		<br/>
		<input onChange={handleName} className="input"
		value={name} type="text" />
		<br/>

		<label className="label">Email</label>
		<br/>
		<input onChange={handleEmail} className="input"
		value={email} type="email" />
		<br/>
		<label className="label">Password</label>
		<br/>
		<input onChange={handlePassword} className="input"
		value={password} type="password" />
		<br/>
		<label className="label">Role</label>
		<br/>
		<input onChange={handleRole} className="input"
		value={role} type="text"/>
		<br/>
		<br/>
		<button onClick={handleSubmit} className="btn" type="submit">

	    	Submit
		</button>
		
		<button onClick={() => props.changeRegister(false)}>go back</button>
	</form>
	</div>
	
);


}