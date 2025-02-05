<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '../../../../components/header.svelte';
	import IconButton from '../../../../components/button/iconButton.svelte';
	import AddIcon from '../../../../icons/addIcon.svelte';
	import { addNewEntity } from '../../../../components/entity/add-entity.svelte';
	import { entitiesState$, fetchEntities } from '../../../../states/entities.state.svelte';
	import type { ListItem } from '../../../../components/simple-list.svelte';
	import SimpleList from '../../../../components/simple-list.svelte';

	const add = async () => {
		const id = await addNewEntity(null);

		if (id) {
			await fetchEntities(true);
		}
	};

	onMount(async () => {
		await fetchEntities(true);
	});

	const edit = async (item: ListItem) => {
		const entity = entitiesState$.entities.find((i) => i.id === item.id);

		if (entity) {
			const id = await addNewEntity(entity);

			if (id) {
				await fetchEntities(true);
			}
		}
	};

	let options$ = $derived.by(() => {
		return entitiesState$.entities.map((entity) => ({
			id: entity.id ?? '',
			name: entity.name ?? '',
			icon: entity.icon || ' '
		}));
	});
</script>

<Header title="Entities">
	<IconButton onclick={() => add()}>
		<AddIcon />
	</IconButton>
</Header>

<SimpleList title="All Entities" items={options$} onClick={(e) => edit(e)} />
