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
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M2.75 12C2.75 11.3096 3.30964 10.75 4 10.75L20 10.75C20.6904 10.75 21.25 11.3096 21.25 12C21.25 12.6904 20.6904 13.25 20 13.25L4 13.25C3.30964 13.25 2.75 12.6904 2.75 12Z"
		fill={color}
	/>
</svg>
