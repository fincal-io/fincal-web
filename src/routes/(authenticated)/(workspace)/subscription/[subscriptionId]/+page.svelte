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

	let entities$ = $state([] as SelectItem[]);

	onMount(async () => {
		const { data } = await api.GET('/api/v1/entities/');

		entities$ = (data || []).map((entity) => ({
			label: entity.name ?? '',
			value: entity.id ?? ''
		}));
	});

	let form = createForm({
		amount: {
			type: 'money',
			attributes: {
				defaultCurrencyId: workspaceState$.workspace?.defaultCurrencyId || '',
				defaultAmount: 0,
				currencyField: 'currencyId',
				amountField: 'amount',
				currencyEditable: true,
				amountEditable: true,
				title: 'Subscription Amount'
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
		entityId: {
			type: 'multi-select',
			attributes: {
				name: 'Business',
				placeholder: 'Select the business',
				multi: false,
				canAdd: true,
				onAdd: () => {}
			}
		},
		frequency: {
			type: 'select',
			defaultValue: 'monthly',
			attributes: {
				name: 'Frequency',
				options: [
					{ label: 'Monthly', value: 'monthly' },
					{ label: 'Quarterly', value: 'quarterly' },
					{ label: 'Yearly', value: 'yearly' }
				]
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

<FormBuilder
	{form}
	title="Subscription"
	close={() => goto('/subscription')}
	submit={handleSubmit}
/>
