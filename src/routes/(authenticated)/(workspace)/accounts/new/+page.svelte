<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { authState$ } from '../../../../../states/auth.state.svelte';
	import { workspaceState$ } from '../../../../../states/workspace.state.svelte';
	import { Validators } from '../../../../../form/validator.svelte';
	import { createForm } from '../../../../../form/form.svelte';
	import FormBuilder from '../../../../../form/form-builder.svelte';
	import { api } from '../../../../../api/api';

	const form = createForm({
		money: {
			type: 'money',
			attributes: {
				defaultCurrencyId: workspaceState$.workspace?.defaultCurrencyId || '',
				defaultAmount: 0,
				currencyField: 'currencyId',
				amountField: 'amount',
				currencyEditable: true,
				amountEditable: true,
				title: 'Initial Balance'
			},
			unmanaged: true
		},
		accountType: {
			defaultValue: 'bank_account',
			type: 'hidden'
		},
		name: {
			type: 'text',
			validators: [Validators.required],
			defaultValue: '',
			attributes: {
				name: 'Name',
				placeholder: 'Pick a friendly name'
			}
		},
		accountNumber: {
			type: 'text',
			defaultValue: '',
			attributes: {
				name: 'Account Number (Optional)',
				placeholder: 'Enter the account number',
				hint: accountNumberHelper
			}
		},
		userId: {
			defaultValue: authState$.self?.id || '',
			type: 'account-picker',
			attributes: {
				placeholder: 'Select the account holder'
			}
		}
	});

	// const accountTypes = [
	// 	{ label: 'Bank Account', value: 'bank_account' },
	// 	{ label: 'Credit Card', value: 'credit-card' },
	// 	{ label: 'Wallet', value: 'wallet' }
	// ];

	const submit = async (body: any) => {
		const { data } = await api.POST('/api/v1/accounts/', {
			body
		});

		goto(`/accounts/${data?.id}`, { replaceState: true });
	};
</script>

{#snippet accountNumberHelper()}
	<p class="hint">Used for intelligent imports <a href={null}>Learn More</a></p>
{/snippet}

<FormBuilder {form} title="New Account" close={() => goto('/accounts')} {submit} />

<style lang="scss">
	.hint {
		margin-top: 12px;
		font-size: 12px;
		letter-spacing: 0.01em;
		text-align: right;
		color: var(--color-text-low);
		opacity: 0.9;

		a {
			color: var(--color-text-low);
			text-decoration: underline;
			text-underline-offset: 2px;
			cursor: pointer;
		}
	}
</style>
