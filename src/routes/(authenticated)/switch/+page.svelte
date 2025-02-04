<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { api } from '../../../api/api';
	import type { components } from '../../../api/fincal';
	import IconButton from '../../../components/button/iconButton.svelte';
	import EmptyIcon from '../../../icons/emptyIcon.svelte';
	import PlusIcon from '../../../icons/plusIcon.svelte';
	import TextButton from '../../../components/button/textButton.svelte';
	import { switchWorkspace } from '../../../states/workspace.state.svelte';
	import Header from '../../../components/header.svelte';
	import AddIcon from '../../../icons/addIcon.svelte';
	import ArrowRightIcon from '../../../icons/arrowRightIcon.svelte';
	import SimpleList, { type ListItem } from '../../../components/simple-list.svelte';

	let workspaces$ = $state<components['schemas']['workspace_entity'][]>([]);

	onMount(async () => {
		const { data = [] } = await api.GET('/api/v1/workspaces/');
		workspaces$ = data;
	});

	const addWorkspace = () => {
		goto('/switch/add');
	};

	let items$ = $derived(
		workspaces$.map((w) => {
			return {
				id: w.id ?? '',
				name: w.name ?? '',
				hint: `TODO: Reez P. + 6 others`,
				open: true
			} as ListItem;
		})
	);
</script>

<Header title="Switch Workspaces" showNav={false}>
	<IconButton onclick={() => addWorkspace()}>
		<AddIcon />
	</IconButton>
</Header>

<div class="content"></div>
<SimpleList
	title="Pick a workspace"
	items={items$}
	onClick={async (item) => {
		await switchWorkspace(item.id);
		goto('/home', { replaceState: true });
	}}
/>
