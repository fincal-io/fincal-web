<script lang="ts">
	import { onMount } from 'svelte';
	import { formElements, type createForm } from './form.svelte';
	import Header from '../components/header.svelte';
	import IconButton from '../components/button/iconButton.svelte';
	import MultiplyIcon from '../icons/multiplyIcon.svelte';
	import FilledButton from '../components/button/filledButton.svelte';
	import AccountPicker from '../components/form/account-picker.svelte';

	let {
		form,
		title = '',
		close = () => {},
		submit = async (value: any) => {},
		asBottomSheet = false
	}: {
		form: ReturnType<typeof createForm>;
		title?: string;
		close?: () => void;
		asBottomSheet?: boolean;
		submit?: (value: any) => Promise<void | string>;
	} = $props();

	let value$ = $state({} as Record<string, any>);

	let accountPickerControl$ = $derived.by(() => {
		return form.controls.find(({ label, control }) => {
			return control.type === 'account-picker';
		});
	});

	let components$ = $derived.by(() => {
		return form.controls
			.filter(({ label, control }) => {
				if (control.type === 'hidden' || control.type === 'account-picker') {
					return false;
				}

				return true;
			})
			.map((c) => {
				if (c.control?.attributesBuilder) {
					return {
						...c,
						control: {
							...c.control,
							attributes: c.control.attributesBuilder(value$)
						}
					};
				}

				return c;
			});
	});

	onMount(() => {
		const values = {} as Record<string, any>;

		form.controls.forEach(({ label, control }) => {
			if (!control.unmanaged) {
				values[label] = control.defaultValue;
			}
		});

		value$ = {
			...value$,
			...values
		};
	});

	let loading$ = $state(false);

	const handleSubmit = async () => {
		const value = value$;

		// run all validators

		const errors = form.controls.flatMap(({ label, control }) => {
			if (!control.validators?.length) {
				return [];
			}

			for (const validator of control.validators) {
				const error = validator(value[label], { control });

				if (error) {
					return Array.isArray(error) ? error : [error];
				}
			}

			return [];
		});

		if (errors.length) {
			console.error(errors);
			return;
			// handler errors
		}

		loading$ = true;

		try {
			const err = await submit(value);

			if (err) {
				// handler error
			}
		} catch (e) {
			console.log(e);
		} finally {
			loading$ = false;
		}
	};

	onMount(() => {
		form.listen('patchValue', (value) => {
			value$ = {
				...value$,
				...value
			};
		});
	});
</script>

<Header {title} showNav={false} transparent={asBottomSheet}>
	<IconButton onclick={close}>
		<MultiplyIcon color="var(--color-text-lower)"></MultiplyIcon>
	</IconButton>
</Header>

<div class="content">
	{#each components$ as { label, control }}
		{@const Block = formElements[control.type]}

		{#if Block}
			<Block
				{control}
				form={{ value$ }}
				setValue={(value) => {
					value$ = {
						...value$,
						[label]: value
					};
				}}
				updateState={(cb) => {
					value$ = {
						...value$,
						...cb(value$)
					};
				}}
				value$={value$[label]}
			/>
		{:else}
			<p>No block found for {control.type}</p>
		{/if}
	{/each}
</div>

<div class="footer">
	{#if accountPickerControl$}
		<AccountPicker
			placeholder={accountPickerControl$.control.attributes?.placeholder}
			value={value$[accountPickerControl$.label]}
			change={(value) => {
				value$[accountPickerControl$.label] = value;
			}}
		/>
	{:else}
		<span></span>
	{/if}

	<FilledButton onclick={handleSubmit} block loading={loading$} size="lg">Save</FilledButton>
</div>

<style lang="scss">
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 16px 18px;
		border-top: 1px solid var(--color-border-variant);

		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 24px;
	}
</style>
