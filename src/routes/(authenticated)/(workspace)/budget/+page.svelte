<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { BreadcrumbItem } from '../../../../components/breadcrumb.svelte';
	import Header from '../../../../components/header.svelte';
	import Menu, { type MenuOption } from '../../../../components/menu.svelte';
	import { api } from '../../../../api/api';
	import { workspaceState$ } from '../../../../states/workspace.state.svelte';
	import type { components } from '../../../../api/fincal';
	import TabBlock, { type Tab } from '../../../../components/tab-block.svelte';
	import MonthPicker from '../../../../components/month-picker.svelte';
	import PricerBlock from '../../../../components/pricer-block.svelte';
	import { currencyFormatter } from '../../../../actions/currency.formatter.svelte';
	import type { SelectItem } from '../../../../components/form/simple-select.svelte';

	const menuItems: MenuOption[] = [
		{
			id: 'edit',
			label: 'Edit template'
		}
	];

	const onSelect = (opt: MenuOption) => {
		switch (opt.id) {
			case 'edit':
				goto('/budget/template');
				break;
		}
	};

	let categoryOptions$ = $state<SelectItem[]>([]);

	const fetchCategories = async () => {
		const categoryReq = await api.GET('/api/v1/categories/');

		categoryOptions$ =
			categoryReq.data?.map((category) => ({
				label: category.name ?? '',
				value: category.id ?? '',
				attributes: {
					icon: category.icon
				}
			})) ?? [];
	};

	let activeTemplate$ = $state<components['schemas']['budget_template_entity'] | undefined>(
		undefined
	);

	onMount(async () => {
		fetchCategories();

		if (!workspaceState$.workspace?.activeBudgetTemplateId) return;

		const { data } = await api.GET('/api/v1/budgets/{id}', {
			params: {
				path: {
					id: workspaceState$.workspace?.activeBudgetTemplateId ?? ''
				}
			}
		});

		if (data?.id) {
			activeTemplate$ = data;
		}
	});

	let view$ = $derived.by(() => {
		const template = activeTemplate$;

		return {
			...template,
			balance: template?.income ?? 0,
			groups: (template?.groups ?? []).map((group) => ({
				...group,
				items: (group?.items ?? []).map((item) => ({
					...item,
					spent: 0,
					left: item?.amount ?? 0,
					category: categoryOptions$.find((o) => o.value === item?.categoryId) ?? null
				}))
			}))
		};
	});
</script>

<Header title="Budget">
	<Menu options={menuItems} select={onSelect} />
</Header>
<MonthPicker />
<PricerBlock title="Balance" value={view$.balance} />

<div class="sections">
	{#each view$.groups as group}
		<div class="section">
			<table>
				<thead>
					<tr>
						<th>{group.name}</th>
						<!-- <th class="price-header">
							<p class="title">Budgeted</p>
							<p
								class="price-text budget"
								use:currencyFormatter={group.items.reduce((acc, item) => acc + item.amount, 0)}
							></p>
						</th> -->
						<th class="price-header">
							<p class="title">Spent</p>
							<p
								class="price-text spent"
								use:currencyFormatter={group.items.reduce((acc, item) => acc + item.spent, 0)}
							></p>
						</th>
						<th class="price-header">
							<p class="title">Remaining</p>
							<p
								class="price-text left"
								use:currencyFormatter={group.items.reduce((acc, item) => acc + item.left, 0)}
							></p>
						</th>
					</tr>
				</thead>

				<tbody>
					{#each group.items as item}
						<tr>
							<td>{item.category?.label ?? ''}</td>
							<!-- <td class="price-block">
								<p class="price-text budget" use:currencyFormatter={item.amount}></p>
							</td> -->
							<td class="price-block">
								<p class="price-text spent" use:currencyFormatter={item.spent}></p>
							</td>
							<td class="price-block">
								<p class="price-text left" use:currencyFormatter={item.left}></p>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/each}
</div>

<style lang="scss">
	.sections {
		display: flex;
		gap: 18px;
		flex-direction: column;
		padding: 18px 0 0 0;

		p.price-text {
			font-size: 14px;
			color: var(--color-text-low);
			letter-spacing: 0.02em;
			margin-bottom: 8px;
		}

		table {
			width: 100%;
			border-collapse: collapse;
			background-color: var(--color-surface-low);

			thead {
				tr {
					th {
						text-align: left;
						padding: 12px 8px;
						border-bottom: 1px solid var(--color-border-variant);

						&.price-header {
							text-align: right;
						}

						p.title {
							font-size: 12px;
							color: var(--color-text-lower);
							font-weight: 300;
							margin-bottom: 4px;
						}
					}
				}
			}

			tbody {
				td {
					padding: 12px 8px;

					&.price-block {
						text-align: right;
					}
				}
			}
		}

		td,
		th {
			&:first-child {
				padding-left: 18px;
			}

			&:last-child {
				padding-right: 18px;
			}
		}
	}
</style>
