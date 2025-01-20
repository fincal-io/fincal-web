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
	import type { components } from '../../../../../api/fincal';
	import { authState$ } from '../../../../../states/auth.state.svelte';
	import { workspaceState$ } from '../../../../../states/workspace.state.svelte';

	const close = () => {
		goto('/accounts');
	};

	const accountTypes = [
		{ label: 'Bank Account', value: 'bank_account' },
		{ label: 'Credit Card', value: 'credit-card' },
		{ label: 'Wallet', value: 'wallet' }
	];

	let accountHolders$ = $state([] as SelectItem[]);

	let account$ = $state({
		accountType: 'bank_account',
		name: '',
		accountNumber: '',
		userId: authState$.self?.id || '',
		amount: undefined as undefined | number,
		currencyId: workspaceState$.workspace?.defaultCurrencyId ?? ''
	});

	let loading$ = $state(false);

	let availableCurrencies$ = $derived(
		workspaceState$.currencies
			.filter((c) => workspaceState$.workspace?.enabledCurrencyIds?.includes(c.code || ''))
			.map((c) => ({
				label: c.code?.toLocaleUpperCase() || '',
				value: c.code || ''
			}))
	);

	onMount(async () => {
		const { data } = await api.GET('/api/v1/users/');

		if (data) {
			accountHolders$ = data.map((user) => ({
				label: user.name || '',
				value: user.id || ''
			}));
		}
	});

	const save = async () => {
		try {
			loading$ = true;

			const { data } = await api.POST('/api/v1/accounts/', {
				body: account$
			});

			goto(`/accounts/${data?.id}`, { replaceState: true });

			loading$ = false;
		} catch (e) {
			console.log(e);
		} finally {
			loading$ = false;
		}
	};
</script>

<div class="wrapper">
	<div class="header">
		<h1>New Account</h1>
		<IconButton onclick={close}>
			<CloseIcon color="var(--md-outline-variant)"></CloseIcon>
		</IconButton>
	</div>

	<div class="content">
		<FormGroup label="Account Holder">
			<SimpleSelect
				placeholder="Select the account holder"
				options={accountHolders$}
				value={account$.userId}
				change={(value) => {
					account$.userId = value;
				}}
			/>
		</FormGroup>
		<FormGroup label="Account Type">
			<SimpleSelect
				placeholder="Select the type of account"
				options={accountTypes}
				value={account$.accountType}
				change={(value) => {
					account$.accountType = value;
				}}
			/>
		</FormGroup>
		<FormGroup label="Name">
			<SimpleInput placeholder="Pick a friendly name" bind:value={account$.name} />
		</FormGroup>
		<FormGroup label="Currency">
			<SimpleSelect
				placeholder="Select the currency"
				options={availableCurrencies$}
				value={account$.currencyId}
				change={(value) => {
					account$.currencyId = value;
				}}
			/>
		</FormGroup>
		<FormGroup label="Opening Balance">
			<CurrencyInput
				value={account$.amount}
				currencyId={account$.currencyId}
				update={(v) => {
					account$.amount = v;
				}}
			/>
		</FormGroup>
		<FormGroup label="Account Number (Optional)">
			<SimpleInput placeholder="Enter the account number" bind:value={account$.accountNumber} />
			<p class="hint">Used for intelligent imports <a href={null}>Learn More</a></p>
		</FormGroup>
	</div>

	<div class="actions">
		<FilledButton onclick={() => save()} block loading={loading$} size="lg"
			>Create Account</FilledButton
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

	.hint {
		margin-top: 8px;
		font-size: 11px;
		letter-spacing: 0.01em;
		text-align: right;
		color: var(--md-on-surface-variant);
		opacity: 0.9;

		a {
			color: var(--md-tertiary);
			text-decoration: underline;
			text-underline-offset: 2px;
			cursor: pointer;
		}
	}
</style>
