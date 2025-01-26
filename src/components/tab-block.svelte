<script lang="ts" module>
	export type Tab = {
		name: string;
		id: string;
	};
</script>

<script lang="ts">
	let {
		tabs = [],
		active = '',
		change = () => {}
	}: { tabs?: Tab[]; active?: string; change?: (tab: string) => void } = $props();
</script>

<div class="tab-block">
	{#each tabs as tab}
		<button class="tab" class:active={tab.id === active} onclick={() => change(tab.id)}>
			{tab.name}
		</button>
	{/each}
</div>

<style lang="scss">
	.tab-block {
		background-color: var(--color-surface-low);
		position: relative;

		display: flex;
		flex-wrap: nowrap;
		overflow: auto hidden;

		.tab {
			padding: 16px;
			font-size: 12px;
			font-weight: 500;
			color: var(--color-text-low);
			cursor: pointer;
			border-bottom: 1px solid var(--color-border);
			transition: color 0.2s ease-in-out;
			text-transform: uppercase;
			letter-spacing: 0.06em;
			border: none;
			outline: none;
			background-color: transparent;
			position: relative;

			&.active {
				color: var(--color-primary);
				font-weight: 600;

				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					height: 2px;
					background-color: var(--color-primary);
				}
			}
		}
	}
</style>
