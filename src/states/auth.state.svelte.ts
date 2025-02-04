import { goto } from '$app/navigation';
import { page } from '$app/state';
import { api } from '../api/api';

export const authState$ = $state({
	isLoggedIn: false,
	settled: false,
	self: {
		id: '',
		name: '',
		icon: ''
	}
});

google.accounts.id.initialize({
	client_id: '267281036021-jhsdssjklpcbnevoj3cq0aeuqhmd22pt.apps.googleusercontent.com',
	ux_mode: 'popup',
	use_fedcm_for_prompt: true,
	context: 'use',
	auto_select: true,
	callback: async (response) => {
		const accessToken = response?.credential ?? '';

		if (accessToken) {
			const result = await api.POST('/api/v1/auth/google', {
				body: {
					token: accessToken
				}
			});

			const token = result?.data?.token ?? '';

			if (token) {
				localStorage.setItem('accessToken', token);

				initAuth();
			} else {
				console.error("Couldn't get access token", { result });
			}
		}
	}
});

const verifyToken = async () => {
	const token = localStorage.getItem('accessToken');

	if (!token) {
		return false;
	}

	const result = await api.GET('/api/v1/users/self', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	const user = result?.data?.id ?? null;

	if (user) {
		authState$.self = {
			id: user,
			name: result?.data?.name ?? '',
			icon: result?.data?.icon ?? ''
		};
	} else {
		authState$.self = {
			id: '',
			name: '',
			icon: ''
		};
	}

	return !!user;
};

export const initAuth = async () => {
	authState$.settled = false;

	try {
		const valid = await verifyToken();

		if (!valid) {
			goto('/sign-in', { replaceState: true });
		} else {
			authState$.isLoggedIn = true;

			if (page.url.pathname === '/sign-in') {
				goto('/', { replaceState: true });
			}
		}
	} catch (e) {
		console.log(e);
	} finally {
		authState$.settled = true;
	}
};

export const initGoogleLogin = async () => {
	try {
		try {
			google.accounts.id.prompt();

			google.accounts.id.renderButton(document.getElementById('google-sign-in-wrapper')!, {
				type: 'standard',
				text: 'continue_with',
				shape: 'pill',
				width: 320,
				logo_alignment: 'left',
				size: 'large',
				theme: 'outline'
			});
		} catch (error) {
			console.error('Error displaying Google Sign-In prompt:', error);
		}

		// authState$.isLoggedIn = true;
	} catch (e) {
		console.log(e);
	} finally {
		// authState$.loading = false;
	}
};
