import { api } from '../api/api';
import type { components } from '../api/fincal';
import type { SelectItem } from '../components/form/simple-select.svelte';

export const entitiesState$ = $state({
	entities: [] as components['schemas']['entity_entity'][],
	options: [] as SelectItem[]
});

export const fetchEntities = async (fetchNew: boolean = false) => {
	if (!entitiesState$.entities.length || fetchNew) {
		const data = await api.GET('/api/v1/entities/');

		entitiesState$.entities = data?.data ?? [];
		entitiesState$.options =
			data?.data?.map((entity) => ({
				label: entity.name ?? '',
				value: entity.id ?? ''
			})) ?? [];
	}
};

export const clearFetchedEntity = async () => {
	entitiesState$.entities = [];
};
