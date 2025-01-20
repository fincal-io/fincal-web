<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import { onMount } from 'svelte';
	import type { BreadcrumbItem } from '../../../../../components/breadcrumb.svelte';
	import IconButton from '../../../../../components/button/iconButton.svelte';
	import Header from '../../../../../components/header.svelte';
	import TableCell from '../../../../../components/table/table-cell.svelte';
	import TableRow from '../../../../../components/table/table-row.svelte';
	import Table from '../../../../../components/table/table.svelte';
	import AddIcon from '../../../../../icons/addIcon.svelte';
	import type { components } from '../../../../../api/fincal';
	import { api } from '../../../../../api/api';
	import { workspaceState$ } from '../../../../../states/workspace.state.svelte';

	const breadcrumbs: BreadcrumbItem[] = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Accounts',
			href: '/accounts'
		}
	];

	const edit = () => {
		goto(`/accounts/${page.params.accountId}/edit`);
	};

	let account$ = $state(null as components['schemas']['account_entity'] | null);

	onMount(async () => {
		const { data } = await api.GET('/api/v1/accounts/{id}', {
			params: { path: { id: page.params.accountId } }
		});

		account$ = data || null;
	});

	let formattedBalance$ = $derived.by(() => {
		const currency = workspaceState$?.currencies.find((c) => c.code === account$?.currencyId);

		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency?.code || 'USD'
		});

		return formatter.format(account$?.balance || 0);
	});
</script>

<Header {breadcrumbs}>
	<IconButton onclick={() => edit()}>
		<AddIcon />
	</IconButton>
</Header>

<div class="content">
	<div class="account-info">
		<p class="name">{account$?.name}</p>
		<p class="balance">{formattedBalance$}</p>
		<p class="type">XX876</p>
	</div>
</div>

<style lang="scss">
	.content {
		padding: 6px 8px 6px 10px;
	}

	.account-info {
		display: flex;
		flex-direction: column;
		height: 200px;
		align-items: center;
		justify-content: center;

		.name {
			font-size: 12px;
			color: var(--md-on-surface-variant);
			letter-spacing: 0.02em;
		}

		.balance {
			font-size: 32px;
			color: var(--md-primary);
			font-weight: 600;
			padding: 6px 0 12px;
			letter-spacing: 0.03em;
		}

		.type {
			font-size: 11px;
			color: var(--md-on-surface-variant);
			letter-spacing: 0.02em;
			font-weight: 300;
		}
	}
</style>
