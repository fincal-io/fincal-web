import { api } from '../api/api';
import type { components } from '../api/fincal';
import type { SelectItem } from '../components/form/simple-select.svelte';

export const tagsState$ = $state({
	tags: [] as components['schemas']['tag_entity'][],
	options: [] as SelectItem[]
});

export const fetchTags = async (fetchNew: boolean = false) => {
	if (!tagsState$.tags.length || fetchNew) {
		const data = await api.GET('/api/v1/tags/');
		tagsState$.tags = data?.data ?? [];
		tagsState$.options =
			data?.data?.map((tag) => ({
				label: tag.name ?? '',
				value: tag.id ?? ''
			})) ?? [];
	}
};

export const clearFetchedTag = async () => {
	tagsState$.tags = [];
};
