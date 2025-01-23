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
	import { currencyFormatter } from '../../../../actions/currency.formatter.svelte';

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

<Header title="Accounts">
	<IconButton onclick={() => edit()}>
		<AddIcon />
	</IconButton>
</Header>

<div class="info-header">
	<h2>Total Balance</h2>
	<p class="value" use:currencyFormatter={100}></p>
</div>

<div class="content">
	<p class="content-title">All Accounts</p>
	<div class="list">
		{#each mappedAccounts$ as account}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class="list-item"
				onclick={() => goto(`/accounts/${account.id}`)}
				role="button"
				tabindex="0"
			>
				<div class="logo"></div>
				<div class="info">
					<p class="name">{account.name}</p>
					<p class="hint">{account.user}</p>
				</div>

				<div class="amount" use:currencyFormatter={account.balance}></div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.content {
		.content-title {
			padding: 24px 24px 12px 24px;
			color: var(--color-text-lower);
			font-weight: 600;
			font-size: 14px;
		}
	}

	.list {
		.list-item {
			padding: 16px 24px;
			display: flex;
			gap: 18px;
			align-items: center;
			border-bottom: 1px solid var(--color-border);
			border-bottom: 0.5px solid var(--color-border);

			.logo {
				flex: 0 0 auto;
				background-color: white;
				width: 36px;
				height: 36px;
				border-radius: 100px;
			}

			.info {
				flex: 1 1 auto;
				overflow: hidden;

				.name {
					font-size: 15px;
					font-weight: 600;
					margin-bottom: 4px;
					text-wrap: nowrap;
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.hint {
					color: var(--color-text-lower);
					font-size: 12px;
					font-weight: 400;
				}
			}

			.amount {
				font-size: 17px;
				font-weight: 400;
				padding-left: 22px;
				color: var(--color-primary);
				flex: 0 0 auto;
				letter-spacing: 0;
			}
		}
	}
</style>
