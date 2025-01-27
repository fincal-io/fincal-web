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
				placeholder: 'Enter the tag name',
				name: 'Tag Name'
			}
		},
		color: {
			type: 'color',
			defaultValue: '',
			attributes: {
				placeholder: 'Pick a color',
				name: 'Tag Color'
			}
		}
	});

	onMount(() => {
		form.patchValue(initialValue);
	});

	const handleSubmit = async (value: any) => {
		const tagId = initialValue?.id ?? '';

		if (!tagId || tagId === 'new') {
			const { data } = await api.POST('/api/v1/tags/', {
				body: {
					name: value?.name ?? '',
					color: value?.color ?? ''
				}
			});

			if (data?.id) {
				onSuccess(data.id);
			}
		} else {
			const { data } = await api.PATCH('/api/v1/tags/{tagId}', {
				params: { path: { tagId } },
				body: {
					name: value?.name ?? '',
					color: value?.color ?? ''
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
		title={initialValue?.id ? 'Edit Tag' : 'New Tag'}
	/>

	<div class="spacer"></div>
</BottomSheet>

<style lang="scss">
	.spacer {
		height: 120px;
	}
</style>
