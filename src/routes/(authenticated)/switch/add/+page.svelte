<script lang="ts">
	import { goto } from '$app/navigation';
	import { api } from '../../../../api/api';
	import FilledButton from '../../../../components/button/filledButton.svelte';
	import IconButton from '../../../../components/button/iconButton.svelte';
	import DetailedSelect from '../../../../components/form/detailed-select.svelte';
	import FormGroup from '../../../../components/form/form-group.svelte';
	import SimpleInput from '../../../../components/form/simple-input.svelte';
	import SimpleSelect from '../../../../components/form/simple-select.svelte';
	import type { SelectItem } from '../../../../components/form/simple-select.svelte';
	import CloseIcon from '../../../../icons/closeIcon.svelte';
	import { appState$ } from '../../../../states/app.state.svelte';

	const close = () => {
		goto('/switch');
	};

	let form$ = $state({
		name: '',
		defaultCurrencyId: 'inr',
		enabledCurrencyIds: [] as string[]
	});

	let loading$ = $state(false);

	let currencies$: SelectItem[] = $derived.by(() => {
		return appState$.currencies.map((currency) => ({
			label: `${currency.code?.toLocaleUpperCase()} - ${currency.name}`,
			value: currency.code || ''
		}));
	});

	let filteredCurrencies$ = $derived.by(() => {
		return currencies$.filter((currency) => form$.enabledCurrencyIds.includes(currency.value));
	});

	const addWorkspace = async () => {
		try {
			loading$ = true;

			const { data } = await api.POST('/api/v1/workspaces/', {
				body: form$
			});

			if (data) {
				goto(`/switch`);
			}
		} catch (e) {
			console.error(e);
		} finally {
			loading$ = false;
		}
	};
</script>

<div class="wrapper">
	<div class="header">
		<h1>New Workspace</h1>
		<IconButton onclick={close}>
			<CloseIcon color="var(--md-outline-variant)"></CloseIcon>
		</IconButton>
	</div>

	<div class="content">
		<FormGroup label="Workspace name">
			<SimpleInput placeholder="Pick a workspace name" bind:value={form$.name} />
		</FormGroup>

		<FormGroup label="Supported currencies">
			<DetailedSelect
				multi
				placeholder="Select the account holder"
				options={currencies$}
				values={form$.enabledCurrencyIds}
				change={(value) => {
					form$.enabledCurrencyIds = value;
				}}
			/>
		</FormGroup>

		<FormGroup label="Primary currency">
			<SimpleSelect
				placeholder="Select the account holder"
				options={filteredCurrencies$}
				value={form$.defaultCurrencyId}
				change={(value) => {
					form$.defaultCurrencyId = value;
				}}
			/>
		</FormGroup>
	</div>

	<div class="actions">
		<FilledButton onclick={addWorkspace} loading={loading$} block size="lg">
			Create Workspace
		</FilledButton>
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
