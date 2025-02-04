<script lang="ts">
	import { goto } from '$app/navigation';
	import { api } from '../../../../api/api';
	import FilledButton from '../../../../components/button/filledButton.svelte';
	import IconButton from '../../../../components/button/iconButton.svelte';
	import DetailedSelect from '../../../../components/form/detailed-select.svelte';
	import FormGroup from '../../../../components/form/form-group.svelte';
	import SimpleInput from '../../../../components/form/simple-input.svelte';
	import SimpleSelect from '../../../../components/form/simple-select.svelte';
	import type { SelectItem } from '../../../../components/form/simple-select.svelte';
	import FormBuilder from '../../../../form/form-builder.svelte';
	import { createForm } from '../../../../form/form.svelte';
	import { Validators } from '../../../../form/validator.svelte';
	import CloseIcon from '../../../../icons/closeIcon.svelte';
	import { appState$ } from '../../../../states/app.state.svelte';

	const close = () => {
		goto('/switch');
	};

	let currencies$: SelectItem[] = $derived.by(() => {
		return appState$.currencies.map((currency) => ({
			label: `${currency.code?.toLocaleUpperCase()} - ${currency.name}`,
			value: currency.code || ''
		}));
	});

	const addWorkspace = async (body: any) => {
		const { data } = await api.POST('/api/v1/workspaces/', {
			body
		});

		if (data) {
			goto(`/switch`);
		}
	};

	let form$ = $derived(
		createForm({
			name: {
				type: 'text',
				defaultValue: '',
				validators: [Validators.required],
				attributes: {
					name: 'Workspace name',
					placeholder: 'Pick a workspace name'
				}
			},
			enabledCurrencyIds: {
				type: 'multi-select',
				defaultValue: [] as string[],
				validators: [Validators.required, Validators.minLength(1)],
				attributes: {
					name: 'Enabled currencies',
					placeholder: 'Pick all currencies that you want to enable',
					options: currencies$
				}
			},
			defaultCurrencyId: {
				type: 'select',
				defaultValue: '',
				validators: [Validators.required],
				attributesBuilder: (value: { enabledCurrencyIds?: string[] }) => {
					const options = currencies$.filter((currency) => {
						return value.enabledCurrencyIds?.includes(currency.value) ?? [];
					});

					return {
						name: 'Default currency',
						placeholder: 'Pick a default currency',
						options
					};
				}
			}
		})
	);
</script>

<FormBuilder form={form$} title="Add a new workspace" {close} submit={addWorkspace} />
