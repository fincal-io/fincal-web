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
	import { entitiesState$, fetchEntities } from '../../../../../states/entities.state.svelte';
	import { categoriesState$, fetchCategories } from '../../../../../states/categories.state.svelte';
	import { fetchTags, tagsState$ } from '../../../../../states/tags.state.svelte';
	import { addNewTag } from '../../../../../components/tag/add-tag.svelte';
	import { on } from 'svelte/events';
	import { addNewCategory } from '../../../../../components/category/add-category.svelte';
	import { addNewEntity } from '../../../../../components/entity/add-entity.svelte';
	import FrequencyPicker from '../../../../../components/form/frequency-picker.svelte';

	onMount(async () => {
		await fetchEntities();
		await fetchCategories();
		await fetchTags();
	});

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
			frequency: {
				type: 'frequency',
				defaultValue: '',
				validators: [Validators.required],
				attributes: {
					name: 'Frequency',
					placeholder: 'When do you get paid'
				}
			},
			entityId: {
				type: 'multi-select',
				attributes: {
					name: 'Income Source',
					placeholder: 'Select a income source',
					multi: false,
					canAdd: true,
					options: entitiesState$.options,
					onAdd: addNewEntity
				}
			},
			userId: {
				defaultValue: authState$.self?.id || '',
				type: 'account-picker',
				validators: [Validators.required],
				attributes: {
					placeholder: 'Select the account holder'
				}
			},
			categoryId: {
				type: 'select',
				defaultValue: '',
				attributes: {
					name: 'Category',
					placeholder: 'Select the category',
					options: categoriesState$.options,
					canAdd: true,
					onAdd: addNewCategory
				}
			},
			tagIds: {
				type: 'multi-select',
				attributes: {
					name: 'Tags',
					placeholder: 'Select the tags',
					options: tagsState$.options,
					multi: true,
					canAdd: true,
					onAdd: addNewTag
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

<FormBuilder {form} title="Income" close={() => goto('/income')} submit={handleSubmit} />
