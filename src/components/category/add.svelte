<script lang="ts">
	import { onMount } from 'svelte';
	import { createForm } from '../../form/form.svelte';
	import { Validators } from '../../form/validator.svelte';
	import BottomSheet from '../bottom-sheet.svelte';
	import FormBuilder from '../../form/form-builder.svelte';
	import { api } from '../../api/api';

	let { close, initialValue, onSuccess } = $props();

	const form = createForm({
		name: {
			type: 'text',
			defaultValue: '',
			validators: [Validators.required],
			attributes: {
				placeholder: 'Enter the category name',
				name: 'Category Name'
			}
		},
		icon: {
			type: 'icon',
			defaultValue: '',
			validators: [Validators.required],
			attributes: {
				placeholder: 'Pick a icon',
				name: 'Category Icon'
			}
		}
	});

	onMount(() => {
		form.patchValue(initialValue);
	});

	const handleSubmit = async (value: any) => {
		const categoryId = initialValue?.id ?? '';

		if (!categoryId || categoryId === 'new') {
			const { data } = await api.POST('/api/v1/categories/', {
				body: {
					name: value?.name ?? '',
					icon: value?.icon ?? ''
				}
			});

			if (data?.id) {
				onSuccess(data.id);
			}
		} else {
			const { data } = await api.PATCH('/api/v1/categories/{id}', {
				params: { path: { id: categoryId } },
				body: {
					name: value?.name ?? '',
					icon: value?.icon ?? ''
				}
			});

			if (data?.id) {
				onSuccess(data.id);
			}
		}
	};
</script>

<BottomSheet open {close}>
	<FormBuilder
		asBottomSheet
		{form}
		submit={handleSubmit}
		{close}
		title={initialValue?.id ? 'Edit Category' : 'New Category'}
	/>

	<div class="spacer"></div>
</BottomSheet>

<style lang="scss">
	.spacer {
		height: 120px;
	}
</style>
