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

	const breadcrumbs: BreadcrumbItem[] = [
		{
			name: 'Home',
			href: '/home'
		},
		{
			name: 'Tags',
			href: '/tags'
		}
	];

	const add = () => {
		goto(`/tags/new`);
	};

	let tags$ = $state([] as components['schemas']['tag_entity'][]);

	onMount(async () => {
		const { data } = await api.GET('/api/v1/tags/');

		tags$ = data || [];
	});
</script>

<Header {breadcrumbs}>
	<IconButton onclick={() => add()}>
		<AddIcon />
	</IconButton>
</Header>

<div class="content">
	<Table>
		{#each tags$ as tag}
			<TableRow onclick={() => goto(`/tags/${tag.id}`)}>
				<TableCell>
					<span class="color" style="background-color: {tag.color}"></span>
				</TableCell>
				<TableCell max>{tag.name}</TableCell>
			</TableRow>
		{/each}
	</Table>
</div>

<style lang="scss">
	.content {
		padding: 6px 8px 6px 10px;
	}

	.color {
		height: 18px;
		display: block;
		width: 18px;
		border-radius: 4px;
		background-color: white;
	}
</style>
