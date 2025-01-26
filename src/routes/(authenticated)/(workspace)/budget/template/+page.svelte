<script lang="ts">
	import FilledButton from '../../../../../components/button/filledButton.svelte';
	import IconButton from '../../../../../components/button/iconButton.svelte';
	import TextButton from '../../../../../components/button/textButton.svelte';
	import Checkbox from '../../../../../components/form/checkbox.svelte';
	import CurrencyInput from '../../../../../components/form/currency-input.svelte';
	import FormGroup from '../../../../../components/form/form-group.svelte';
	import SimpleInput from '../../../../../components/form/simple-input.svelte';
	import Header from '../../../../../components/header.svelte';
	import type { MenuOption } from '../../../../../components/menu.svelte';
	import Menu from '../../../../../components/menu.svelte';
	import AddIcon from '../../../../../icons/addIcon.svelte';
	import { workspaceState$ } from '../../../../../states/workspace.state.svelte';

	let template$ = $state({
		income: 0,
		autoIncome: true,
		groups: []
	});

	const groupMenuOptions: MenuOption[] = [
		{
			id: 'rename',
			label: 'Rename'
		},
		{
			id: 'remove',
			label: 'Remove'
		}
	];
</script>

<Header title="Budget Template"></Header>

<div class="content">
	<div class="row">
		<p class="label">Budget my net income</p>
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

	<div class="groups">
		<div class="group">
			<div class="row">
				<p class="label">Group 1</p>

				<div class="action">
					<IconButton>
						<AddIcon />
					</IconButton>
					<Menu options={groupMenuOptions} />
				</div>
			</div>

			<div class="items">
				<div class="item">
					<p class="label"><span class="tag"></span> Group 1</p>
					<div class="cost">
						<CurrencyInput
							borderless
							currencyId={workspaceState$.workspace?.defaultCurrencyId}
							placeholder="Enter your income"
							update={(v) => {
								template$.income = v;
							}}
							value={template$.income}
						/>
					</div>
					<Menu options={groupMenuOptions} />
				</div>
				<div class="item">
					<p class="label"><span class="tag"></span> Group 1</p>
					<div class="cost">
						<CurrencyInput
							borderless
							currencyId={workspaceState$.workspace?.defaultCurrencyId}
							placeholder="Enter your income"
							update={(v) => {
								template$.income = v;
							}}
							value={template$.income}
						/>
					</div>
					<Menu options={groupMenuOptions} />
				</div>
				<div class="item">
					<p class="label"><span class="tag"></span> Group 1</p>
					<div class="cost">
						<CurrencyInput
							borderless
							currencyId={workspaceState$.workspace?.defaultCurrencyId}
							placeholder="Enter your income"
							update={(v) => {
								template$.income = v;
							}}
							value={template$.income}
						/>
					</div>
					<Menu options={groupMenuOptions} />
				</div>
				<div class="item">
					<p class="label"><span class="tag"></span> Group 1</p>
					<div class="cost">
						<CurrencyInput
							borderless
							currencyId={workspaceState$.workspace?.defaultCurrencyId}
							placeholder="Enter your income"
							update={(v) => {
								template$.income = v;
							}}
							value={template$.income}
						/>
					</div>
					<Menu options={groupMenuOptions} />
				</div>
				<div class="item">
					<p class="label"><span class="tag"></span> Group 1</p>
					<div class="cost">
						<CurrencyInput
							borderless
							currencyId={workspaceState$.workspace?.defaultCurrencyId}
							placeholder="Enter your income"
							update={(v) => {
								template$.income = v;
							}}
							value={template$.income}
						/>
					</div>
					<Menu options={groupMenuOptions} />
				</div>

				<div class="start">
					<FilledButton size="sm">New Item</FilledButton>
				</div>
			</div>
		</div>
	</div>

	<div class="end">
		<TextButton faded>New Group</TextButton>
	</div>
</div>

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
		justify-content: flex-end;
		padding: 16px 16px;
		border-top: 1px solid var(--color-border-variant);
	}

	.groups {
		padding: 16px;
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
						width: 8px;
						height: 8px;
						border-radius: 4px;
						background-color: var(--color-primary);
						margin-right: 10px;
					}
				}

				&:nth-child(odd) {
					background-color: var(--color-container);
				}
			}
		}
	}
</style>
