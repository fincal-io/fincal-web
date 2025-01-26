<script lang="ts">
	let {
		open = false,
		children,
		close = () => {}
	}: { open?: boolean; children?: any; close?: () => void } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="bottom-sheet-wrapper" class:open onclick={close} role="button" tabindex="0">
	<div
		class="bottom-sheet"
		class:open
		onclick={(e: MouseEvent) => e.stopPropagation()}
		role="button"
		tabindex="0"
	>
		<div class="scrub"></div>
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.bottom-sheet-wrapper {
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

	.scrub {
		display: grid;
		place-items: center;

		&::after {
			content: ' ';
			display: block;
			width: 50px;
			height: 7px;
			border-radius: 8px;
			background-color: var(--color-container-highest);
			margin-top: 16px;
		}
	}

	.bottom-sheet {
		background-color: var(--color-container);
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		max-height: 60dvh;
		z-index: var(--z-index-nav);
		border-radius: 16px 16px 0 0;

		display: flex;
		flex-direction: column;

		overflow: hidden auto;

		bottom: -70dvh;
		transition: bottom 0.3s ease;

		&.open {
			bottom: 0;
		}
	}
</style>
