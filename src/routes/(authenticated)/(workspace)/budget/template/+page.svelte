<script lang="ts">
	import { onMount } from 'svelte';
	import BottomSheet from '../../../../../components/bottom-sheet.svelte';
	import FilledButton from '../../../../../components/button/filledButton.svelte';
	import IconButton from '../../../../../components/button/iconButton.svelte';
	import TextButton from '../../../../../components/button/textButton.svelte';
	import Checkbox from '../../../../../components/form/checkbox.svelte';
	import CurrencyInput from '../../../../../components/form/currency-input.svelte';
	import FormGroup from '../../../../../components/form/form-group.svelte';
	import SimpleInput from '../../../../../components/form/simple-input.svelte';
	import type { SelectItem } from '../../../../../components/form/simple-select.svelte';
	import Header from '../../../../../components/header.svelte';
	import type { MenuOption } from '../../../../../components/menu.svelte';
	import Menu from '../../../../../components/menu.svelte';
	import AddIcon from '../../../../../icons/addIcon.svelte';
	import {
		fetchWorkspaceInfo,
		workspaceState$
	} from '../../../../../states/workspace.state.svelte';
	import { v4 as uuid } from 'uuid';
	import { api } from '../../../../../api/api';
	import SimpleSelect from '../../../../../components/form/simple-select.svelte';
	import { currencyFormatter } from '../../../../../actions/currency.formatter.svelte';
	import { addNewCategory } from '../../../../../components/category/add-category.svelte';
	import { addNewTag } from '../../../../../components/tag/add-tag.svelte';
	import { goto } from '$app/navigation';

	interface Item {
		id: string;
		tagId: string;
		categoryId: string;
		amount: number;
	}

	interface Group {
		id: string;
		name: string;
		items: Item[];
	}

	let template$ = $state({
		income: 0,
		autoIncome: true,
		addOthers: true,
		groups: [] as Group[]
	});

	const groupMenuOptions: MenuOption[] = [
		{
			id: 'rename',
			label: 'Edit'
		},
		{
			id: 'remove',
			label: 'Remove'
		}
	];

	let activeGroup$ = $state<Group | null>(null);

	let activeItem$ = $state<(Item & { groupId: string }) | null>(null);

	let tagOptions$ = $state<SelectItem[]>([]);
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

	const fetchTags = async () => {
		const tagReq = await api.GET('/api/v1/tags/');

		tagOptions$ =
			tagReq.data?.map((tag) => ({
				label: tag.name ?? '',
				value: tag.id ?? '',
				attributes: {
					color: tag.color ?? ''
				}
			})) ?? [];
	};

	const fetchBudget = async () => {
		if (!workspaceState$.workspace?.activeBudgetTemplateId) {
			return;
		}

		const budgetReq = await api.GET('/api/v1/budgets/{id}', {
			params: { path: { id: workspaceState$.workspace?.activeBudgetTemplateId } }
		});

		if (budgetReq.data) {
			template$ = budgetReq.data as any;
		}
	};

	onMount(async () => {
		fetchTags();
		fetchCategories();
		fetchBudget();
	});

	let loading$ = $state(false);

	const update = async () => {
		if (!template$.groups.length || template$.groups.find((g) => !g.items.length)) {
			return;
		}

		try {
			loading$ = true;

			const { data } = await api.POST('/api/v1/budgets/', {
				body: template$
			});

			if (data?.id) {
				await fetchWorkspaceInfo();
				goto('/budget', { replaceState: true });
			}
		} catch (e) {
			console.error(e);
		} finally {
			loading$ = false;
		}
	};

	let remaining$ = $derived.by(() => {
		const income = template$.income;

		if (!income) {
			return 0;
		}

		return (
			income -
			template$.groups.reduce(
				(acc, group) => acc + group.items.reduce((acc, item) => acc + item.amount, 0),
				0
			)
		);
	});
</script>

<Header title="Budget Template"></Header>

<div class="content">
	<div class="row">
		<p class="label">Budget my total income</p>
		<Checkbox size="lg" bind:checked={template$.autoIncome} />
	</div>

	<FormGroup label="Income">
		<CurrencyInput
			currencyId={workspaceState$.workspace?.defaultCurrencyId}
			placeholder="Enter your income"
			update={(v) => {
				template$.income = v;
			}}
			value={template$.income}
		/>
	</FormGroup>

	<div class="row">
		<p class="label">Add "others" for unspecified expenses</p>
		<Checkbox size="lg" bind:checked={template$.addOthers} />
	</div>

	<div class="groups">
		{#each template$.groups as group}
			<div class="group">
				<div class="row">
					<p class="label">{group.name}</p>

					<div class="action">
						<Menu
							options={groupMenuOptions}
							select={(option) => {
								switch (option.id) {
									case 'rename':
										activeGroup$ = group;
										break;
									case 'remove':
										const confirm = window.confirm('Are you sure you want to remove this group?');

										if (!confirm) {
											return;
										}

										template$.groups = template$.groups.filter((g) => g.id !== group.id);
										break;
								}
							}}
						/>
					</div>
				</div>

				<div class="items">
					{#each group.items as item}
						{@const tag = tagOptions$.find((o) => o.value === item.tagId)}
						<div class="item">
							<p class="label">
								{#if tag}
									<span class="tag" style="background-color: {tag.attributes?.color};"
										>{tag?.label}</span
									>
								{/if}

								{categoryOptions$.find((o) => o.value === item.categoryId)?.label ?? ''}
							</p>
							<div class="cost">
								<CurrencyInput
									borderless
									currencyId={workspaceState$.workspace?.defaultCurrencyId}
									placeholder="Enter your income"
									update={(v) => {
										item.amount = v;
									}}
									value={item.amount}
								/>
							</div>
							<Menu
								options={groupMenuOptions}
								select={(option) => {
									switch (option.id) {
										case 'rename':
											activeItem$ = {
												...item,
												groupId: group.id
											};
											break;
										case 'remove':
											const confirm = window.confirm('Are you sure you want to remove this item?');

											if (!confirm) {
												return;
											}

											group.items = group.items.filter((i) => i.id !== item.id);

											break;
									}
								}}
							/>
						</div>
					{/each}
					<div class="start">
						<div class="ticker">
							<div class="info">
								<p class="title">Budgeted</p>
								<p
									class="amount"
									use:currencyFormatter={group.items.reduce((acc, item) => acc + item.amount, 0)}
								></p>
							</div>

							<div class="info">
								<p class="title">Remaining</p>
								<p class="amount" use:currencyFormatter={remaining$}></p>
							</div>
						</div>

						<FilledButton
							onclick={() => {
								activeItem$ = {
									id: uuid(),
									groupId: group.id,
									tagId: '',
									categoryId: '',
									amount: 0
								};
							}}
							size="sm">New Item</FilledButton
						>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="end">
		<TextButton
			faded
			onclick={() => {
				activeGroup$ = {
					id: uuid(),
					name: '',
					items: []
				};
			}}>New Group</TextButton
		>
	</div>
</div>

<div class="footer">
	<FilledButton block loading={loading$} onclick={update}>Update template</FilledButton>
</div>

<BottomSheet open={activeGroup$ !== null} close={() => (activeGroup$ = null)}>
	{#if activeGroup$}
		<FormGroup label="Group Name">
			<SimpleInput
				value={activeGroup$.name}
				setValue={(v) => {
					if (activeGroup$) {
						activeGroup$.name = v;
					}
				}}
			/>
		</FormGroup>

		<div class="sheet-footer">
			<FilledButton
				block
				onclick={() => {
					const group = {
						name: activeGroup$?.name ?? '',
						id: activeGroup$?.id ?? '',
						items: activeGroup$?.items ?? []
					};

					if (!group.name || !group.id) {
						return;
					}

					const index = template$.groups.findIndex((g) => g.id === group.id);

					if (index === -1) {
						template$.groups.push(group);
					} else {
						template$.groups[index] = group;
					}

					activeGroup$ = null;
				}}>Save</FilledButton
			>
		</div>
	{/if}
</BottomSheet>

<BottomSheet open={activeItem$ !== null} close={() => (activeItem$ = null)}>
	{#if activeItem$}
		<FormGroup label="Category">
			<SimpleSelect
				add={async () => {
					const id = await addNewCategory(null);

					if (id) {
						await fetchCategories();

						if (activeItem$) {
							activeItem$.categoryId = id;
						}
					}
				}}
				options={categoryOptions$}
				value={activeItem$.categoryId}
				placeholder="Select a category"
				change={(v) => {
					if (activeItem$) {
						activeItem$.categoryId = v;
					}
				}}
			/>
		</FormGroup>

		<FormGroup label="Tag (optional)">
			<SimpleSelect
				add={async () => {
					const id = await addNewTag(null);

					if (id) {
						await fetchTags();

						if (activeItem$) {
							activeItem$.tagId = id;
						}
					}
				}}
				reset={() => {
					if (activeItem$) {
						activeItem$.tagId = '';
					}
				}}
				options={tagOptions$}
				placeholder="Select a tag"
				value={activeItem$.tagId}
				change={(v) => {
					if (activeItem$) {
						activeItem$.tagId = v;
					}
				}}
			/>
		</FormGroup>

		<div class="sheet-footer">
			<FilledButton
				block
				onclick={() => {
					const { groupId, ...item } = {
						groupId: activeItem$?.groupId ?? '',
						id: activeItem$?.id ?? '',
						tagId: activeItem$?.tagId ?? '',
						categoryId: activeItem$?.categoryId ?? '',
						amount: activeItem$?.amount ?? 0
					};

					const group = template$.groups.find((g) => g.id === groupId);

					if (!group) {
						return;
					}

					const index = group.items.findIndex((i) => i.id === item.id);

					if (index === -1) {
						group.items.push(item);
					} else {
						group.items[index] = item;
					}

					activeItem$ = null;
				}}>Save</FilledButton
			>
		</div>
	{/if}
</BottomSheet>

<style lang="scss">
	.row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px;

		.label {
			flex: 1 1 auto;
			font-size: 16px;
			color: var(--md-on-surface-variant);
			letter-spacing: 0.02em;
		}
	}

	.action {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.end {
		display: flex;
		align-items: center;
		padding: 16px;
		justify-content: flex-end;
	}

	.start {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 16px;
		border-top: 1px solid var(--color-border-variant);

		.ticker {
			flex: 1 1 auto;
			display: flex;
			gap: 24px;

			.info {
				.title {
					font-size: 11px;
					color: var(--color-text-lower);
					margin-bottom: 4px;
					font-weight: 400;
					letter-spacing: 0.02em;
				}

				.amount {
					color: var(--color-primary);
					font-size: 18px;
				}
			}
		}
	}

	.groups {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.sheet-footer {
		padding: 16px;
		display: flex;
		justify-content: flex-end;
	}

	.group {
		background-color: var(--color-surface-low);

		.row {
			padding: 12px 16px;
			p.label {
				font-weight: 600;
			}
		}

		.items {
			.item {
				padding: 4px 16px 4px 32px;
				border-top: 1px solid var(--color-border-variant);

				display: grid;
				grid-template-columns: 1fr 120px auto;
				place-items: center start;
				gap: 8px;

				.cost {
					width: 100%;
				}

				.label {
					font-size: 14px;
					color: var(--color-text-low);
					letter-spacing: 0.02em;
					display: flex;
					align-items: center;

					.tag {
						display: inline-block;
						border-radius: 4px;
						background-color: var(--color-primary);
						margin-right: 10px;

						font-size: 8px;
						padding: 4px 6px;

						display: grid;
						place-items: center;
						line-height: 12px;
						font-weight: 600;

						text-transform: uppercase;

						color: rgba(0, 0, 0, 0.7);
					}
				}

				&:nth-child(odd) {
					background-color: var(--color-container);
				}
			}
		}
	}

	.content {
		padding-bottom: 100px;
	}

	.footer {
		padding: 16px;
		background-color: var(--color-surface);

		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;

		border-top: 1px solid var(--color-border-variant);
	}
</style>
