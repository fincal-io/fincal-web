<script lang="ts">
	import { goto } from '$app/navigation';
	import FilledButton from '../../../../components/button/filledButton.svelte';
	import IconButton from '../../../../components/button/iconButton.svelte';
	import CurrencyInput from '../../../../components/form/currency-input.svelte';
	import FormGroup from '../../../../components/form/form-group.svelte';
	import SimpleInput from '../../../../components/form/simple-input.svelte';
	import SimpleSelect from '../../../../components/form/simple-select.svelte';
	import Header from '../../../../components/header.svelte';
	import CloseIcon from '../../../../icons/closeIcon.svelte';

	const close = () => {
		goto('/accounts');
	};

	const accountTypes = [
		{ label: 'Checking', value: 'checking' },
		{ label: 'Savings', value: 'savings' },
		{ label: 'Credit Card', value: 'credit-card' },
		{ label: 'Investment', value: 'investment' },
		{ label: 'Loan', value: 'loan' },
		{ label: 'Mortgage', value: 'mortgage' },
		{ label: 'Other', value: 'other' }
	];

	const accountHolders = [
		{ label: 'John Doe', value: 'john-doe' },
		{ label: 'Jane Doe', value: 'jane-doe' },
		{ label: 'Bob Smith', value: 'bob-smith' },
		{ label: 'Alice Johnson', value: 'alice-johnson' },
		{ label: 'Charlie Brown', value: 'charlie-brown' }
	];

	let account$ = $state({
		type: '',
		name: '',
		number: '',
		userId: '',
		amount: undefined as undefined | number,
		currencyId: '$'
	});
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
				options={accountHolders}
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
				value={account$.type}
				change={(value) => {
					account$.type = value;
				}}
			/>
		</FormGroup>
		<FormGroup label="Name">
			<SimpleInput placeholder="Pick a friendly name" bind:value={account$.name} />
		</FormGroup>
		<FormGroup label="Opening Balance">
			<CurrencyInput
				placeholder="$ 0.00"
				value={account$.amount}
				currencyId={account$.currencyId}
				update={(c, v) => {
					account$.amount = v;
					account$.currencyId = c;
				}}
			/>
		</FormGroup>
		<FormGroup label="Account Number (Optional)">
			<SimpleInput placeholder="Enter the account number" bind:value={account$.number} />
			<p class="hint">Used for intelligent imports <a href={null}>Learn More</a></p>
		</FormGroup>
	</div>

	<div class="actions">
		<FilledButton block size="lg">Create Account</FilledButton>
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
