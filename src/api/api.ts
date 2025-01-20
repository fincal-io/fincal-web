import createClient from 'openapi-fetch';
import type { paths } from './fincal.js';

const client = createClient<paths>({
	baseUrl: 'http://localhost:8080/',
	fetch: async (req) => {
		const accessToken =
			sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

		req.headers.set('Authorization', `Bearer ${accessToken}`);

		return fetch(req);
	}
});

export const api = client;
