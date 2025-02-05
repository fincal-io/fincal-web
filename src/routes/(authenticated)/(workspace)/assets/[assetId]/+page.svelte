<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { api } from '../../../../../api/api';
	import type { SelectItem } from '../../../../../components/form/simple-select.svelte';
	import FormBuilder from '../../../../../form/form-builder.svelte';
	import { createForm } from '../../../../../form/form.svelte';
	import { Validators } from '../../../../../form/validator.svelte';
	import { authState$ } from '../../../../../states/auth.state.svelte';
	import { workspaceState$ } from '../../../../../states/workspace.state.svelte';

	let form = $derived(
		createForm({
			amount: {
				type: 'money',
				attributes: {
					defaultCurrencyId: workspaceState$.workspace?.defaultCurrencyId || '',
					defaultAmount: 0,
					currencyField: 'currencyId',
					amountField: 'amount',
					currencyEditable: true,
					amountEditable: true,
					title: 'Income'
				},
				unmanaged: true
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
			canAppreciate: {
				type: 'select',
				defaultValue: '',
				attributes: {
					name: 'Automated Appreciation',
					placeholder: 'Can the asset appreciate?',
					options: [
						{ label: 'Yes', value: 'yes' },
						{ label: 'No', value: 'no' }
					]
				}
			},
			frequency: {
				type: 'frequency',
				defaultValue: '',
				validators: [Validators.required],
				attributes: {
					name: 'Frequency',
					placeholder: 'When the asset appreciates'
				}
			},
			percentage: {
				type: 'text',
				defaultValue: '',
				validators: [Validators.required],
				attributes: {
					name: 'Rate',
					placeholder: 'What is the estimated rate of appreciation?'
				}
			},
			userId: {
				defaultValue: authState$.self?.id || '',
				type: 'account-picker',
				validators: [Validators.required],
				attributes: {
					placeholder: 'Select the account holder'
				}
			}
		})
	);

	const handleSubmit = async (body: any) => {
		if (page.params.subscriptionId) {
			const { data } = await api.PATCH('/api/v1/subscriptions/{id}', {
				params: {
					path: {
						id: page.params.subscriptionId
					}
				}
			});

			if (data?.id) {
				goto(`/subscription`, { replaceState: true });
			}

			return;
		}

		const { data } = await api.POST('/api/v1/subscriptions/', {
			body
		});

		goto(`/subscription`, { replaceState: true });
	};
</script>

<FormBuilder {form} title="Assets" close={() => goto('/income')} submit={handleSubmit} />
