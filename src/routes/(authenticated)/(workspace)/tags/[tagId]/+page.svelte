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

	const close = () => {
		goto('/tags');
	};

	let tag$ = $state({
		color: '',
		name: ''
	});

	let loading$ = $state(false);

	const save = async () => {
		try {
			loading$ = true;

			const tagId = page.params.tagId;

			if (!tagId || tagId === 'new') {
				const { data } = await api.POST('/api/v1/tags/', {
					body: tag$
				});

				if (data?.id) {
					goto(`/tags`, { replaceState: true });
				}
			} else {
				const { data } = await api.PATCH('/api/v1/tags/{tagId}', {
					params: { path: { tagId } },
					body: tag$
				});

				if (data?.id) {
					goto(`/tags`, { replaceState: true });
				}
			}
		} catch (e) {
			console.log(e);
		} finally {
			loading$ = false;
		}
	};

	let isNew$ = $derived(page.params.tagId === 'new');

	onMount(async () => {
		const tagId = page.params.tagId;

		if (tagId && tagId !== 'new') {
			const { data } = await api.GET('/api/v1/tags/{tagId}', {
				params: { path: { tagId } }
			});

			tag$ = {
				color: data?.color || '#bcbcbc',
				name: data?.name || ''
			};
		} else {
			tag$ = {
				color: '#bcbcbc',
				name: ''
			};
		}
	});
</script>

<div class="wrapper">
	<div class="header">
		<h1>{isNew$ ? 'New Tag' : 'Edit Tag'}</h1>
		<IconButton onclick={close}>
			<CloseIcon color="var(--md-outline-variant)"></CloseIcon>
		</IconButton>
	</div>

	<div class="content">
		<FormGroup label="Name">
			<SimpleInput placeholder="Pick a friendly name" bind:value={tag$.name} />
		</FormGroup>
		<FormGroup label="Tag Color">
			<ColorPicker
				value={tag$.color}
				update={(v) => {
					tag$.color = v;
				}}
			/>
		</FormGroup>
	</div>

	<div class="actions">
		<FilledButton onclick={() => save()} block loading={loading$} size="lg"
			>{isNew$ ? 'Create Tag' : 'Update Tag'}</FilledButton
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
