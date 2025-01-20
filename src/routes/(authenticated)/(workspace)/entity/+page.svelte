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
			name: 'Entity',
			href: '/entity'
		}
	];

	const add = () => {
		goto(`/entity/new`);
	};

	let entities$ = $state([] as components['schemas']['entity_entity'][]);

	onMount(async () => {
		const { data } = await api.GET('/api/v1/entities/');

		entities$ = data || [];
	});
</script>

<Header {breadcrumbs}>
	<IconButton onclick={() => add()}>
		<AddIcon />
	</IconButton>
</Header>

<div class="content">
	<Table>
		{#each entities$ as entity}
			<TableRow onclick={() => goto(`/entity/${entity.id}`)}>
				<TableCell>
					<span class={['icon ti', entity.icon?.replace('icon::', '')]}></span>
				</TableCell>
				<TableCell max>{entity.name}</TableCell>
			</TableRow>
		{/each}
	</Table>
</div>

<style lang="scss">
	.content {
		padding: 6px 8px 6px 10px;
	}

	.icon {
		font-size: 22px;
		display: block;
		background-color: transparent;
	}
</style>
