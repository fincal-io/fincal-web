<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { api } from '../../../../api/api';
	import type { BreadcrumbItem } from '../../../../components/breadcrumb.svelte';
	import IconButton from '../../../../components/button/iconButton.svelte';
	import Header from '../../../../components/header.svelte';
	import PricerBlock from '../../../../components/pricer-block.svelte';
	import TabBlock, { type Tab } from '../../../../components/tab-block.svelte';
	import AddIcon from '../../../../icons/addIcon.svelte';
	import { workspaceState$ } from '../../../../states/workspace.state.svelte';
	import type { components } from '../../../../api/fincal';
	import Menu from '../../../../components/menu.svelte';
	import SimpleList from '../../../../components/simple-list.svelte';

	const edit = (id = 'new') => {
		goto(`/accounts/new`);
	};

	let summary$ = $derived.by(() => {
		return {
			total: 0,
			currencyId: workspaceState$.workspace?.defaultCurrencyId
		};
	});

	let activeTab$ = $state('all');

	let holdings$ = $state<components['schemas']['holding_entity'][]>([]);

	onMount(async () => {
		const res = await api.GET('/api/v1/holdings/');
		holdings$ = res.data || [];
	});

	let tabItems = $derived.by(() => {
		const exchanges: Record<string, Tab> = {};

		holdings$.forEach((holding) => {
			if (holding?.exchange?.id && !exchanges[holding?.exchange?.id]) {
				exchanges[holding?.exchange?.id] = {
					name: holding?.exchange?.code ?? '',
					id: holding?.exchange?.id
				};
			}
		});

		return [
			{
				name: 'All',
				id: 'all'
			},
			...Object.values(exchanges)
		];
	});

	let items = $derived.by(() => {
		return holdings$
			.filter((fund) => activeTab$ === 'all' || fund.exchange?.id === activeTab$)
			.map((item) => {
				return {
					id: item?.id ?? '',
					name: item.fund?.name ?? '',
					hint: `${item.tradingAccount?.userId ?? ''} - ${item.quantity} units`,
					balance: {
						amount: 0,
						currencyId: item?.exchange?.currencyId ?? ''
					}
				};
			});
	});

	let menuOptions = $derived.by(() => {
		return [
			{
				label: 'Manage Trading Accounts',
				id: 'new'
			}
		];
	});
</script>

<Header title="Investments">
	<IconButton onclick={() => edit()}>
		<AddIcon />
	</IconButton>
	<Menu options={menuOptions} select={(option) => console.log(option)} />
</Header>

<PricerBlock
	attached
	title="Total Balance"
	value={summary$.total}
	currencyId={summary$.currencyId}
/>

<TabBlock tabs={tabItems} active={activeTab$} change={(tab) => (activeTab$ = tab)} />

<SimpleList {items} onClick={(item) => console.log(item)} />
