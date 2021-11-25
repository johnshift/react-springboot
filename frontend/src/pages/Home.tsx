import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect } from 'preact/hooks';
import { csrfTokenAtom } from '../jotai/csrfToken';

type TokenRequest = {
	token: string;
}

const Home = () => {

	const [csrfToken, setCsrfToken] = useAtom(csrfTokenAtom);

	useEffect(() => {
		console.log('csrfToken: ', csrfToken);

		const backendURL = 'http://localhost:8080'

		const getToken = async () => {
			await axios.get<TokenRequest>(
					backendURL + '/csrf-token',
					{ 
						// important to allow cookies to be sent
						withCredentials: true 
					}
				)
					.then(res => {
						setCsrfToken(res.data.token);
					})
					.catch(err => {
						console.log('getToken catch: ', err);
					});
		}

		if (!csrfToken) {
			console.log("NO CSRF TOKEN IN JOTAI. Request csrf-token")
			getToken();
		}

	}, []);

	return (
		<div class="flex container mx-auto h-screen justify-center items-center">
			<h1 class="text-6xl">csrf token: "{csrfToken}"</h1>
		</div>
	)
};

export default Home;