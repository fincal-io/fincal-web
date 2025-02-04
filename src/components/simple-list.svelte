<script lang="ts" module>
	export type ListItem = {
		icon?: string;
		name: string;
		hint?: string;
		balance?: {
			amount: number;
			currencyId: string;
		};
		id: string;
		open?: boolean;
	};
</script>

<script lang="ts">
	import { currencyFormatter } from '../actions/currency.formatter.svelte';
	import ArrowRightIcon from '../icons/arrowRightIcon.svelte';

	import EmptyIcon from '../icons/emptyIcon.svelte';

	let {
		title = '',
		items = [],
		onClick = () => {}
	}: {
		title?: string;
		items?: ListItem[];
		onClick?: (item: ListItem) => void;
	} = $props();
</script>

<div class="content">
	{#if title}
		<p class="content-title">{title}</p>
	{/if}

	{#if items.length === 0}
		<div class="no-result">
			<div class="no-result-container">
				<EmptyIcon size={32} color="var(--color-text-lower)" />
				<p>It's empty here...</p>
			</div>
		</div>
	{:else}
		<div class="list">
			{#each items as item}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div class="list-item" onclick={() => onClick(item)} role="button" tabindex="0">
					{#if item.icon}
						<div class="logo">
							{#if item.icon.startsWith('color::')}
								<span class="color" style="background-color: {item.icon.replace('color::', '')}"
								></span>
							{:else}
								<span class="icon ti {item.icon.replace('icon::', '')}"> </span>
							{/if}
						</div>
					{/if}
					<div class="info">
						<p class="name">{item.name}</p>

						{#if item.hint}
							<p class="hint">{item.hint}</p>
						{/if}
					</div>

					{#if item.open}
						<div class="switch">
							<ArrowRightIcon size={22} />
						</div>
					{/if}

					{#if item.balance}
						<div
							class="amount price-text"
							use:currencyFormatter={{
								amount: item.balance.amount,
								currency: item.balance.currencyId
							}}
						></div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.content {
		padding-top: 20px;

		.content-title {
			padding: 0 24px 12px 18px;
			color: var(--color-text-lowest);
			font-weight: 500;
			font-size: 14px;
		}
	}

	.switch {
		flex: 0 0 auto;
		opacity: 0.6;
	}

	.no-result {
		padding: 0 16px 16px 16px;

		.no-result-container {
			background-color: var(--color-surface-low);
			height: 200px;
			border-radius: 8px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 24px;

			p {
				font-size: 16px;
				color: var(--color-text-lower);
			}
		}
	}

	.list {
		.list-item {
			padding: 14px 18px;
			display: flex;
			gap: 12px;
			align-items: center;
			border-bottom: 1px solid var(--color-border);

			.logo {
				flex: 0 0 auto;
				background-color: var(--color-surface-lower);
				width: 36px;
				height: 36px;
				border-radius: 100px;

				display: grid;
				place-items: center;

				.color {
					height: 16px;
					display: block;
					width: 16px;
					border-radius: 40px;
					background-color: white;
				}

				.icon {
					font-size: 18px;
				}
			}

			.info {
				flex: 1 1 auto;
				display: flex;
				flex-direction: column;
				gap: 4px;
				overflow: hidden;

				.name {
					font-size: 14px;
					font-weight: 600;
					text-wrap: nowrap;
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.hint {
					color: var(--color-text-lower);
					font-size: 12px;
					font-weight: 500;
					letter-spacing: 0.02em;
				}
			}

			.amount {
				font-size: 16px;
				font-weight: 500;
				padding-left: 22px;
				color: var(--color-primary);
				flex: 0 0 auto;
				letter-spacing: 0;
			}
		}
	}
</style>
