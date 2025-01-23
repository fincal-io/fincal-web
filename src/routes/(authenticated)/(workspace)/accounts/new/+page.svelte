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
	import Header from '../../../../../components/header.svelte';
	import MultiplyIcon from '../../../../../icons/multiplyIcon.svelte';
	import PricerBlock from '../../../../../components/pricer-block.svelte';
	import AccountPicker from '../../../../../components/form/account-picker.svelte';

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

<Header title="New Account" showNav={false}>
	<IconButton onclick={close}>
		<MultiplyIcon color="var(--color-text-lower)"></MultiplyIcon>
	</IconButton>
</Header>

<PricerBlock
	title="Initial Balance"
	value={account$.amount}
	currencyId={account$.currencyId}
	editable
/>

<div class="wrapper">
	<div class="content">
		<FormGroup label="Name">
			<SimpleInput placeholder="Pick a friendly name" bind:value={account$.name} />
		</FormGroup>

		<FormGroup label="Account Number (Optional)">
			<SimpleInput placeholder="Enter the account number" bind:value={account$.accountNumber} />
			<p class="hint">Used for intelligent imports <a href={null}>Learn More</a></p>
		</FormGroup>
	</div>
</div>

<div class="footer">
	<AccountPicker
		placeholder="Select the account holder"
		options={accountHolders$}
		value={account$.userId}
		change={(value) => {
			account$.userId = value;
		}}
	></AccountPicker>
	<FilledButton onclick={() => save()} block loading={loading$} size="lg">Save</FilledButton>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 12px;
		padding: 12px 22px;

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 12px;
			margin-right: -4px;
			padding: 8px 0;

			h1 {
				font-size: 18px;
				font-weight: 600;
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
		margin-top: 12px;
		font-size: 12px;
		letter-spacing: 0.01em;
		text-align: right;
		color: var(--color-text-lower);
		opacity: 0.9;

		a {
			color: var(--color-text-lower);
			text-decoration: underline;
			text-underline-offset: 2px;
			cursor: pointer;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 16px 24px;
		border-top: 1px solid var(--color-border-variant);

		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 24px;
	}
</style>
