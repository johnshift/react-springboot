import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect } from 'preact/hooks';
import { csrfTokenAtom } from '../jotai/csrfToken';
import { route } from 'preact-router'

const Home = () => {

	const [csrfToken, setCsrfToken] = useAtom(csrfTokenAtom);

	useEffect(() => {
		console.log('csrfToken: ', csrfToken);

		const backendURL = 'http://localhost:8080'

		const getToken = async () => {
			await axios.get<string>(
				backendURL + '/api/v1/session/csrf-token',
				{
					// important to allow cookies to be sent
					withCredentials: true
				}
			)
				.then(res => {
					console.log('res.data: ', res.data);
					setCsrfToken(res.data);
				})
				.catch(err => {
					console.log('getToken catch: ', err.response);
					if (err.response.status > 400) {
						console.log('rerouting to login');
						route('/login', true);
					}
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
