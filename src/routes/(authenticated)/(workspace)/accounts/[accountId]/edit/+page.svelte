<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { api } from '../../../../../../api/api';
	import { createForm } from '../../../../../../form/form.svelte';
	import FormBuilder from '../../../../../../form/form-builder.svelte';
	import { Validators } from '../../../../../../form/validator.svelte';

	const form = createForm({
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
		}
	});

	onMount(async () => {
		const { data } = await api.GET('/api/v1/accounts/{id}', {
			params: { path: { id: page.params.accountId } }
		});

		if (data) {
			form.patchValue({
				name: data.name || '',
				accountNumber: data.accountNumber || ''
			});
		}
	});

	const submit = async (body: any) => {
		const { data } = await api.PATCH('/api/v1/accounts/{id}', {
			body,
			params: { path: { id: page.params.accountId } }
		});

		history.back();

		if (!data?.id) {
			throw new Error('Something went wrong');
		}
	};
</script>

{#snippet accountNumberHelper()}
	<p class="hint">Used for intelligent imports <a href={null}>Learn More</a></p>
{/snippet}

<FormBuilder
	{form}
	title="New Account"
	close={() => goto(`/accounts/${page.params.accountId}`)}
	{submit}
/>

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
