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
	import SimpleList, { type ListItem } from '../../../../components/simple-list.svelte';
	import { addNewTag } from '../../../../components/tag/add-tag.svelte';

	let tags$ = $state([] as components['schemas']['tag_entity'][]);

	const fetchTags = async () => {
		const { data } = await api.GET('/api/v1/tags/');

		tags$ = data || [];
	};

	let options$ = $derived.by(() => {
		return tags$.map((tag) => ({
			id: tag.id ?? '',
			name: tag.name ?? '',
			icon: `color::${tag.color}`
		}));
	});

	const add = async () => {
		const id = await addNewTag(null);

		if (id) {
			await fetchTags();
		}
	};

	onMount(async () => {
		fetchTags();
	});

	const edit = async (item: ListItem) => {
		const tag = tags$.find((i) => i.id === item.id);

		if (tag) {
			const id = await addNewTag({
				...tag,
				color: tag.color?.replace('color::', '') ?? ''
			});

			if (id) {
				await fetchTags();
			}
		}
	};
</script>

<Header title="Tags">
	<IconButton onclick={() => add()}>
		<AddIcon />
	</IconButton>
</Header>

<SimpleList title="All Tags" items={options$} onClick={(e) => edit(e)} />
