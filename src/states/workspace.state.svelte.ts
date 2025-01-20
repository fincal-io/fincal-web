import { goto } from '$app/navigation';
import { api } from '../api/api';
import type { components } from '../api/fincal';

export const workspaceState$ = $state({
	loaded: false,
	workspaceId: '',
	workspaceToken: '',
	currencies: [] as components['schemas']['currency_entity'][],
	workspace: null as components['schemas']['workspace_entity'] | null,
	users: [] as components['schemas']['user_entity'][]
});

export const switchWorkspace = async (workspaceId: string) => {
	const { data } = await api.GET('/api/v1/auth/workspace-token', {
		params: { query: { workspaceId } }
	});

	if (data?.token) {
		workspaceState$.workspaceToken = data.token;
		workspaceState$.workspaceId = workspaceId;

		sessionStorage.setItem('accessToken', data.token);

		localStorage.setItem('activeWorkspaceId', workspaceId);

		await fetchWorkspaceInfo();
	}
};

export const initWorkspace = async () => {
	const activeWorkspaceId = localStorage.getItem('activeWorkspaceId');

	if (activeWorkspaceId) {
		workspaceState$.loaded = false;
		await switchWorkspace(activeWorkspaceId);
		workspaceState$.loaded = true;
	}

	if (!workspaceState$.workspaceId) {
		goto('/switch');
	}
};

export const fetchWorkspaceInfo = async () => {
	const { data } = await api.GET('/api/v1/workspaces/{id}', {
		params: { path: { id: workspaceState$.workspaceId } }
	});

	if (data) {
		workspaceState$.workspace = data;
	}

	const { data: currencies } = await api.GET('/api/v1/currencies/');

	if (currencies) {
		workspaceState$.currencies = currencies;
	}

	const { data: users } = await api.GET('/api/v1/users/');

	if (users) {
		workspaceState$.users = users;
	}
};
