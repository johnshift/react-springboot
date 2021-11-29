import { useState } from 'preact/hooks';
import axios, { AxiosResponse } from 'axios';

type SessionCsrfResponse = {
	['csrf-token']: string;
}

const Login = () => {

	const [principal, setPrincipal] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const togglepassword = () => {
		setShowPassword(!showPassword);
	}

	const login = async () => {
		console.log('principal: ', principal);
		console.log('password: ', password);
		console.log("login clicked");

		await axios.get(
			'http://localhost:8080/api/v1/session/csrf-token',
			{ withCredentials: true }
		).then(res => {
			console.log('csrf-token request res.data: ', res.data);
			alert("token received: \"" + res.data + "\"")
		}).catch(err => {
			console.log('csrf-token request err.response: ', err.response);
		})

		// await axios.post('http://localhost:8080/api/v1/login',
		// 	{
		// 		principal, password
		// 	},
		// 	{
		// 		withCredentials: true
		// 	}
		// ).then(res => {

		// 	console.log("res: ", res)

		// })
		// 	.catch(err => {
		// 		console.log('err.response: ', err.response);
		// 	})
	}

	return (
		<div class="flex container mx-auto h-screen justify-center items-center">
			<div>
				<h1>Login</h1>
				<br /><br />
				<input
					placeholder="Username or Email"
					onInput={(e) => { setPrincipal((e.target as HTMLInputElement).value) }}
				/>
				<br /><br />
				<input
					placeholder='Password' type={showPassword ? 'text' : 'password'}
					onInput={e => { setPassword((e.target as HTMLInputElement).value) }}
				/>
				<br /><br />
				<button aria-label='show password' onClick={togglepassword}>show password</button>
				<br /><br />
				<button onClick={login}>Login</button>
			</div>
		</div>
	)
}

export default Login
