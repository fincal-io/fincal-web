<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { components } from '../../../../api/fincal';
	import IconButton from '../../../../components/button/iconButton.svelte';
	import Header from '../../../../components/header.svelte';
	import AddIcon from '../../../../icons/addIcon.svelte';
	import { api } from '../../../../api/api';
	import { workspaceState$ } from '../../../../states/workspace.state.svelte';
	import PricerBlock from '../../../../components/pricer-block.svelte';
	import SimpleList from '../../../../components/simple-list.svelte';

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

	let summary$ = $derived.by(() => {
		return {
			total: accounts$.reduce((acc, account) => {
				return acc + (account?.balance ?? 0);
			}, 0),
			currencyId: workspaceState$.workspace?.defaultCurrencyId
		};
	});

	let list$ = $derived.by(() => {
		return {
			title: 'All Accounts',
			items: mappedAccounts$.map((account) => {
				return {
					name: account.name || '',
					hint: account.user,
					balance: {
						amount: account.balance || 0,
						currencyId: workspaceState$.workspace?.defaultCurrencyId ?? ''
					},
					id: account.id ?? ''
				};
			})
		};
	});
</script>

<Header title="Accounts">
	<IconButton onclick={() => edit()}>
		<AddIcon />
	</IconButton>
</Header>

<PricerBlock title="Total Balance" value={summary$.total} currencyId={summary$.currencyId} />

<SimpleList {...list$} onClick={(item) => goto(`/accounts/${item.id}`)} />
