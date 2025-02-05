import { api } from '../api/api';
import type { components } from '../api/fincal';
import type { SelectItem } from '../components/form/simple-select.svelte';

export const categoriesState$ = $state({
	categories: [] as components['schemas']['category_entity'][],
	options: [] as SelectItem[]
});

export const fetchCategories = async (fetchNew: boolean = false) => {
	if (!categoriesState$.categories.length || fetchNew) {
		const data = await api.GET('/api/v1/categories/');

		categoriesState$.categories = data?.data ?? [];
		categoriesState$.options =
			data?.data?.map((category) => ({
				label: category.name ?? '',
				value: category.id ?? ''
			})) ?? [];
	}
};

export const clearFetchedCategory = async () => {
	categoriesState$.categories = [];
};
