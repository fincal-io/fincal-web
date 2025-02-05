<script lang="ts">
	let { size = 22, color = 'var(--md-on-surface)' }: { size?: number; color?: string } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	width={size}
	height={size}
	{color}
	fill="none"
>
	<path
		d="M15 6L9 12.0001L15 18"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-miterlimit="16"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
