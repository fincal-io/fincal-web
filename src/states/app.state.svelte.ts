import { api } from '../api/api';
import type { components } from '../api/fincal';

export const appState$ = $state({
	loaded: false,
	currencies: [] as components['schemas']['currency_entity'][]
});

export const initApp = async () => {
	await updateAppState();

	appState$.loaded = true;
};

export const updateAppState = async () => {
	const { data } = await api.GET('/api/v1/currencies/');

	appState$.currencies = data || [];
};
