<script lang="ts" module>
	export type BreadcrumbItem = {
		name: string;
		href: string;
	};
</script>

<script lang="ts">
	import { derived } from 'svelte/store';

	let { items = [] }: { items: BreadcrumbItem[] } = $props();

	const mappedItems = items.map((item, index) => {
		const isInMid = index > 0 && index < items.length - 2;

		return {
			name: isInMid && items.length > 3 ? '...' : item.name,
			href: item.href
		};
	});
</script>

<div class="breadcrumb">
	{#each mappedItems as item, index}
		{#if index !== 0}
			<p class="slash">/</p>
		{/if}
		<a class="breadcrumb-item" href={item.href}>{item.name}</a>
	{/each}
</div>

<style lang="scss">
	.breadcrumb {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.breadcrumb-item {
		align-items: center;
		overflow: hidden;

		&:first-child,
		&:last-child {
			flex: 0 0 auto;
		}

		&:last-child {
			font-weight: 500;
		}
	}

	.slash {
		color: var(--md-on-surface-variant);
		font-size: 15px;
	}

	a {
		text-overflow: ellipsis;
		overflow: hidden;
		color: var(--md-on-surface-variant);
		text-decoration: none;
		transition: color 0.2s ease-in-out;
		word-break: none;
		text-wrap: nowrap;
		font-size: 13px;

		&:hover {
			color: var(--md-primary);
		}
	}
</style>
