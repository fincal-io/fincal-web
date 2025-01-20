<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { api } from '../../../../../../api/api';
	import IconButton from '../../../../../../components/button/iconButton.svelte';
	import CloseIcon from '../../../../../../icons/closeIcon.svelte';
	import FilledButton from '../../../../../../components/button/filledButton.svelte';
	import CurrencyInput from '../../../../../../components/form/currency-input.svelte';
	import FormGroup from '../../../../../../components/form/form-group.svelte';
	import SimpleInput from '../../../../../../components/form/simple-input.svelte';
	import SimpleSelect from '../../../../../../components/form/simple-select.svelte';

	const close = () => {
		goto(`/accounts/${page.params.accountId}`);
	};

	let account$ = $state({
		name: '',
		accountNumber: ''
	});

	let loading$ = $state(false);

	onMount(async () => {
		const { data } = await api.GET('/api/v1/accounts/{id}', {
			params: { path: { id: page.params.accountId } }
		});

		if (data) {
			account$.name = data.name || '';
			account$.accountNumber = data.accountNumber || '';
		}
	});

	const save = async () => {
		try {
			loading$ = true;

			const { data } = await api.PATCH('/api/v1/accounts/{id}', {
				body: account$,
				params: { path: { id: page.params.accountId } }
			});

			history.back();

			loading$ = false;
		} catch (e) {
			console.log(e);
		} finally {
			loading$ = false;
		}
	};
</script>

<div class="wrapper">
	<div class="header">
		<h1>New Account</h1>
		<IconButton onclick={close}>
			<CloseIcon color="var(--md-outline-variant)"></CloseIcon>
		</IconButton>
	</div>

	<div class="content">
		<FormGroup label="Name">
			<SimpleInput placeholder="Pick a friendly name" bind:value={account$.name} />
		</FormGroup>
		<FormGroup label="Account Number (Optional)">
			<SimpleInput placeholder="Enter the account number" bind:value={account$.accountNumber} />
			<p class="hint">Used for intelligent imports <a href={null}>Learn More</a></p>
		</FormGroup>
	</div>

	<div class="actions">
		<FilledButton onclick={() => save()} block loading={loading$} size="lg"
			>Update Account</FilledButton
		>
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
