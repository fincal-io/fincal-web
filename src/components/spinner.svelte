<script lang="ts">
	let { size = 'md' }: { size?: 'sm' | 'md' | 'lg' } = $props();
</script>

<div class={['circle', size]}></div>

<style>
	.circle {
		--color: currentColor;
		--duration: 0.9s;

		&.sm {
			--size: 19px;
		}

		&.md {
			--size: 40px;
		}

		&.lg {
			--size: 60px;
		}

		height: var(--size);
		width: var(--size);
		border-color: var(--color) transparent var(--color) var(--color);
		border-width: calc(var(--size) / 6);
		border-style: solid;
		border-image: initial;
		border-radius: 50%;
		animation: var(--duration) linear 0s infinite normal none running rotate;
	}
	.pause-animation {
		animation-play-state: paused;
	}
	@keyframes rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
