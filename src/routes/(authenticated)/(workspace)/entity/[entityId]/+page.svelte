<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import FilledButton from '../../../../../components/button/filledButton.svelte';
	import IconButton from '../../../../../components/button/iconButton.svelte';
	import CurrencyInput from '../../../../../components/form/currency-input.svelte';
	import FormGroup from '../../../../../components/form/form-group.svelte';
	import SimpleInput from '../../../../../components/form/simple-input.svelte';
	import SimpleSelect, {
		type SelectItem
	} from '../../../../../components/form/simple-select.svelte';
	import CloseIcon from '../../../../../icons/closeIcon.svelte';
	import { api } from '../../../../../api/api';
	import { page } from '$app/state';
	import ColorPicker from '../../../../../components/form/color-picker.svelte';
	import IconPicker from '../../../../../components/form/icon-picker.svelte';

	const close = () => {
		goto('/entity');
	};

	let entity$ = $state({
		icon: '',
		name: ''
	});

	let loading$ = $state(false);

	const save = async () => {
		try {
			loading$ = true;

			const entityId = page.params.entityId;

			if (!entityId || entityId === 'new') {
				const { data } = await api.POST('/api/v1/entities/', {
					body: entity$
				});

				if (data?.id) {
					goto(`/entity`, { replaceState: true });
				}
			} else {
				const { data } = await api.PATCH('/api/v1/entities/{id}', {
					params: { path: { id: entityId } },
					body: entity$
				});

				if (data?.id) {
					goto(`/entity`, { replaceState: true });
				}
			}
		} catch (e) {
			console.log(e);
		} finally {
			loading$ = false;
		}
	};

	let isNew$ = $derived(page.params.entityId === 'new');

	onMount(async () => {
		const entityId = page.params.entityId;

		if (entityId && entityId !== 'new') {
			const { data } = await api.GET('/api/v1/entities/{id}', {
				params: { path: { id: entityId } }
			});

			entity$ = {
				icon: data?.icon || '',
				name: data?.name || ''
			};
		} else {
			entity$ = {
				icon: '#bcbcbc',
				name: ''
			};
		}
	});
</script>

<div class="wrapper">
	<div class="header">
		<h1>{isNew$ ? 'New Entity' : 'Edit Entity'}</h1>
		<IconButton onclick={close}>
			<CloseIcon color="var(--md-outline-variant)"></CloseIcon>
		</IconButton>
	</div>

	<div class="content">
		<FormGroup label="Name">
			<SimpleInput placeholder="Pick a friendly name" bind:value={entity$.name} />
		</FormGroup>
		<FormGroup label="Entity icon">
			<IconPicker
				value={entity$.icon}
				update={(v) => {
					entity$.icon = v;
				}}
			/>
		</FormGroup>
	</div>

	<div class="actions">
		<FilledButton onclick={() => save()} block loading={loading$} size="lg"
			>{isNew$ ? 'Create Entity' : 'Update Entity'}</FilledButton
		>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 12px;
		padding: 12px 22px;
		height: 100dvh;

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 12px;
			margin-right: -4px;

			h1 {
				font-size: 16px;
				font-weight: 500;
				margin: 0;
			}
		}

		.content {
			flex: 1 1 auto;
			display: flex;
			flex-direction: column;
			gap: 24px;
			padding-top: 8px;
		}

		.actions {
			flex: 0 0 auto;
		}
	}
</style>
