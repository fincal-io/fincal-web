<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { components } from '../../../../api/fincal';
	import type { BreadcrumbItem } from '../../../../components/breadcrumb.svelte';
	import Header from '../../../../components/header.svelte';
	import { api } from '../../../../api/api';
	import IconButton from '../../../../components/button/iconButton.svelte';
	import AddIcon from '../../../../icons/addIcon.svelte';
	import Table from '../../../../components/table/table.svelte';
	import TableRow from '../../../../components/table/table-row.svelte';
	import TableCell from '../../../../components/table/table-cell.svelte';
	import { addNewCategory } from '../../../../components/category/add-category.svelte';
	import type { ListItem } from '../../../../components/simple-list.svelte';
	import SimpleList from '../../../../components/simple-list.svelte';

	let categories$ = $state([] as components['schemas']['category_entity'][]);

	const fetchCategories = async () => {
		const { data } = await api.GET('/api/v1/categories/');

		categories$ = data || [];
	};

	let options$ = $derived.by(() => {
		return categories$.map((category) => ({
			id: category.id ?? '',
			name: category.name ?? '',
			icon: category.icon || ' '
		}));
	});

	const add = async () => {
		const id = await addNewCategory(null);

		if (id) {
			await fetchCategories();
		}
	};

	onMount(async () => {
		fetchCategories();
	});

	const edit = async (item: ListItem) => {
		const category = categories$.find((i) => i.id === item.id);

		if (category) {
			const id = await addNewCategory(category);

			if (id) {
				await fetchCategories();
			}
		}
	};
</script>

<Header title="Categories">
	<IconButton onclick={() => add()}>
		<AddIcon />
	</IconButton>
</Header>

<SimpleList title="All Categories" items={options$} onClick={(e) => edit(e)} />
