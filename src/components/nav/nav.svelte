<script lang="ts">
	import HomeIcon from '../../icons/homeIcon.svelte';
	import { assets } from '$app/paths';
	import TransactionIcon from '../../icons/transactionIcon.svelte';
	import BudgetIcon from '../../icons/budgetIcon.svelte';
	import ChatIcon from '../../icons/chatIcon.svelte';
	import WhiteboardIcon from '../../icons/whiteboardIcon.svelte';
	import AccountIcon from '../../icons/accountIcon.svelte';
	import IncomeIcon from '../../icons/incomeIcon.svelte';
	import SubscriptionIcon from '../../icons/subscriptionIcon.svelte';
	import LiabilityIcon from '../../icons/liabilityIcon.svelte';
	import AssetIcon from '../../icons/assetIcon.svelte';
	import InvestmentIcon from '../../icons/investmentIcon.svelte';
	import GoalIcon from '../../icons/goalIcon.svelte';
	import TagIcon from '../../icons/tagIcon.svelte';
	import CategoryIcon from '../../icons/categoryIcon.svelte';
	import EntityIcon from '../../icons/entityIcon.svelte';
	import PlanIcon from '../../icons/planIcon.svelte';
	import UserManagementIcon from '../../icons/userManagementIcon.svelte';
	import DocumentationIcon from '../../icons/documentationIcon.svelte';
	import SwitchWorkspaceIcon from '../../icons/switchWorkspaceIcon.svelte';
	import CalculatorIcon from '../../icons/calculatorIcon.svelte';
	import { navState$ } from './nav.state.svelte';

	import { page } from '$app/state';
	import { replaceState, onNavigate } from '$app/navigation';
	import DepositIcon from '../../icons/depositIcon.svelte';
	import IntegrationIcon from '../../icons/integrationIcon.svelte';

	onNavigate(() => {
		navState$.open = false;
	});

	const basePath$ = $derived(page.url.pathname.split('/').at(1));
</script>

<a
	class="nav-background"
	class:open={navState$.open}
	onclick={() => (navState$.open = false)}
	role="button"
	tabindex="0"
	aria-label="Close navigation"
	href={null}
></a>

<div class="nav" class:open={navState$.open}>
	<div class="nav-header">
		<img src={`${assets}/fincal_logo.png`} alt="logo" width="32" height="32" />
		<p>Fincal</p>
		<p class="version">v1.23</p>
	</div>

	<div class="nav-item-group">
		<p class="group-title">General</p>
		<a
			class="nav-item"
			class:active={basePath$ === 'home'}
			data-sveltekit-replacestate
			href="/home"
		>
			<HomeIcon color="var(--md-on-surface-variant)" />
			<p class="name">Home</p>
		</a>
		<div class="divider"></div>
		<a
			class="nav-item"
			class:active={basePath$ === 'transactions'}
			data-sveltekit-replacestate
			href="/transactions"
		>
			<TransactionIcon color="var(--md-on-surface-variant)" />
			<p class="name">Transactions</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'budget'}
			data-sveltekit-replacestate
			href="/budget"
		>
			<BudgetIcon color="var(--md-on-surface-variant)" />
			<p class="name">Budget</p>
		</a>
		<div class="divider"></div>
		<a
			class="nav-item"
			class:active={basePath$ === 'chat'}
			data-sveltekit-replacestate
			href="/chat"
		>
			<ChatIcon color="var(--md-on-surface-variant)" />
			<p class="name">Chat</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'space'}
			data-sveltekit-replacestate
			href="/space"
		>
			<WhiteboardIcon color="var(--md-on-surface-variant)" />
			<p class="name">Briefcase</p>
		</a>
	</div>

	<div class="nav-item-group">
		<p class="group-title">Wealth</p>
		<a
			class="nav-item"
			class:active={basePath$ === 'accounts'}
			data-sveltekit-replacestate
			href="/accounts"
		>
			<AccountIcon color="var(--md-on-surface-variant)" />
			<p class="name">Accounts</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'investments'}
			data-sveltekit-replacestate
			href="/investments"
		>
			<InvestmentIcon color="var(--md-on-surface-variant)" />
			<p class="name">Investments</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'deposits'}
			data-sveltekit-replacestate
			href="/deposits"
		>
			<DepositIcon color="var(--md-on-surface-variant)" />
			<p class="name">Deposits</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'goals'}
			data-sveltekit-replacestate
			href="/goals"
		>
			<GoalIcon color="var(--md-on-surface-variant)" />
			<p class="name">Goals</p>
		</a>
		<div class="divider"></div>
		<a
			class="nav-item"
			class:active={basePath$ === 'assets'}
			data-sveltekit-replacestate
			href="/assets"
		>
			<AssetIcon color="var(--md-on-surface-variant)" />
			<p class="name">Assets</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'liability'}
			data-sveltekit-replacestate
			href="/liability"
		>
			<LiabilityIcon color="var(--md-on-surface-variant)" />
			<p class="name">Liabilities</p>
		</a>
		<div class="divider"></div>
		<a
			class="nav-item"
			class:active={basePath$ === 'subscription'}
			data-sveltekit-replacestate
			href="/subscription"
		>
			<SubscriptionIcon color="var(--md-on-surface-variant)" />
			<p class="name">Subscription</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'income'}
			data-sveltekit-replacestate
			href="/income"
		>
			<IncomeIcon color="var(--md-on-surface-variant)" />
			<p class="name">Income</p>
		</a>
	</div>

	<div class="nav-item-group">
		<p class="group-title">Organization</p>
		<a
			class="nav-item"
			class:active={basePath$ === 'tags'}
			data-sveltekit-replacestate
			href="/tags"
		>
			<TagIcon color="var(--md-on-surface-variant)" />
			<p class="name">Tags</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'category'}
			data-sveltekit-replacestate
			href="/category"
		>
			<CategoryIcon color="var(--md-on-surface-variant)" />
			<p class="name">Categories</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'entity'}
			data-sveltekit-replacestate
			href="/entity"
		>
			<EntityIcon color="var(--md-on-surface-variant)" />
			<p class="name">Entities</p>
		</a>
	</div>

	<div class="nav-item-group">
		<p class="group-title">Tools</p>
		<a
			class="nav-item"
			class:active={basePath$ === 'plan'}
			data-sveltekit-replacestate
			href="/plan"
		>
			<PlanIcon color="var(--md-on-surface-variant)" />
			<p class="name">Plan</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'calculator'}
			data-sveltekit-replacestate
			href="/calculator"
		>
			<CalculatorIcon color="var(--md-on-surface-variant)" />
			<p class="name">Calculators</p>
		</a>
	</div>

	<div class="spacer"></div>

	<div class="nav-item-group">
		<p class="group-title">Settings</p>
		<a
			class="nav-item"
			class:active={basePath$ === 'access'}
			data-sveltekit-replacestate
			href="/access"
		>
			<UserManagementIcon color="var(--md-on-surface-variant)" />
			<p class="name">User Management</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'documentation'}
			data-sveltekit-replacestate
			href="/documentation"
		>
			<DocumentationIcon color="var(--md-on-surface-variant)" />
			<p class="name">Documentation</p>
		</a>
		<a
			class="nav-item"
			class:active={basePath$ === 'integrations'}
			data-sveltekit-replacestate
			href="/integrations"
		>
			<IntegrationIcon color="var(--md-on-surface-variant)" />
			<p class="name">Integrations</p>
		</a>
		<a class="nav-item" href="/switch">
			<SwitchWorkspaceIcon color="var(--md-on-surface-variant)" />
			<span class="name">Switch Workspace</span>
		</a>
	</div>
</div>

<style lang="scss">
	.nav-background {
		z-index: var(--z-index-nav-bg);
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.4);
		transform: translate(-100%);
		transition:
			opacity 0.2s linear,
			transform 0s linear 0.2s;
		opacity: 0;

		&.open {
			opacity: 1;
			transform: translate(0);
			transition:
				opacity 0.2s linear,
				transform 0s linear;
		}
	}

	.nav {
		background-color: var(--color-container);
		position: fixed;
		top: 0;
		bottom: 0;
		width: 360px;
		padding: 12px;
		z-index: var(--z-index-nav);

		display: flex;
		flex-direction: column;

		overflow: hidden auto;

		left: -360px;
		transition: left 0.3s ease;

		&.open {
			left: 0;
		}
	}

	.nav-header {
		padding: 12px;
		display: flex;
		gap: 12px;
		align-items: center;
		margin-bottom: 12px;

		img {
			width: 42px;
			height: 42px;
			border-radius: 8px;
		}

		p {
			font-size: 18px;
			font-weight: 600;

			&.version {
				flex: 1 1 auto;
				text-align: right;
				font-size: 12px;
				color: var(--color-text-lower);
			}
		}
	}

	.spacer {
		flex: 1 1 auto;
	}

	.nav-item-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 36px;

		&:last-child {
			margin-bottom: 0;
		}

		.group-title {
			padding: 0 12px;
			font-size: 11px;
			color: var(--color-text-lower);
			text-transform: uppercase;
			letter-spacing: 0.06em;
			margin-bottom: 8px;
			font-weight: 500;
		}
	}

	.nav-item {
		display: flex;
		align-items: center;
		padding: 10px 12px;
		cursor: pointer;
		gap: 12px;
		border-radius: 6px;
		transition: background-color 0.2s ease-in-out;

		&:hover {
			background-color: var(--color-container-highest);
		}

		span,
		p {
			font-size: 13px;
			color: var(--color-low);
			font-weight: 500;
		}

		&.active {
			background-color: var(--color-container-high);
		}
	}

	.divider {
		height: 1px;
		background-color: var(--color-border-variant);
		margin: 4px 0;
	}
</style>
