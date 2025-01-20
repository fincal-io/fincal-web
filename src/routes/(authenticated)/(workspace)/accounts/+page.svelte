<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { components } from '../../../../api/fincal';
	import type { BreadcrumbItem } from '../../../../components/breadcrumb.svelte';
	import IconButton from '../../../../components/button/iconButton.svelte';
	import Header from '../../../../components/header.svelte';
	import TableCell from '../../../../components/table/table-cell.svelte';
	import TableRow from '../../../../components/table/table-row.svelte';
	import Table from '../../../../components/table/table.svelte';
	import AddIcon from '../../../../icons/addIcon.svelte';
	import { api } from '../../../../api/api';
	import { workspaceState$ } from '../../../../states/workspace.state.svelte';

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

	const edit = (id = 'new') => {
		goto(`/accounts/new`);
	};

	let accounts$ = $state([] as components['schemas']['account_entity'][]);

	onMount(async () => {
		const { data } = await api.GET('/api/v1/accounts/');

		accounts$ = data || [];
	});

	let mappedAccounts$ = $derived.by(() => {
		return accounts$.map((account) => {
			return {
				name: account.name || account.id,
				user: workspaceState$.users.find((u) => u.id === account.userId)?.name || '',
				balance: account.balance,
				id: account.id
			};
		});
	});
</script>

<Header {breadcrumbs}>
	<IconButton onclick={() => edit()}>
		<AddIcon />
	</IconButton>
</Header>

<div class="content">
	<Table>
		{#each mappedAccounts$ as account}
			<TableRow onclick={() => goto(`/accounts/${account.id}`)}>
				<TableCell max>{account.name}</TableCell>
				<TableCell>
					<p class="user">{account.user}</p>
				</TableCell>
				<TableCell end>
					<p class="price">{account.balance}</p>
				</TableCell>
			</TableRow>
		{/each}
	</Table>
</div>

<style lang="scss">
	.content {
		padding: 6px 8px 6px 10px;

		.price {
			color: var(--md-primary);
			font-weight: 600;
			font-size: 12px;
			letter-spacing: 0.01em;
		}

		.user {
			font-size: 12px;
			color: var(--md-on-surface-variant);
		}
	}
</style>
