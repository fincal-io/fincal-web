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
		d="M20.5001 6H3.49979C2.9475 6 2.49979 6.44772 2.49979 7V10.2671C2.49979 10.7034 2.78263 11.0893 3.19867 11.2207L11.6991 13.9049C11.895 13.9668 12.1053 13.9668 12.3013 13.9049L20.801 11.2207C21.217 11.0893 21.4998 10.7034 21.4998 10.2672L21.5001 7.00008C21.5002 6.44776 21.0524 6 20.5001 6Z"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linejoin="round"
	/>
	<path
		d="M3.49979 11.5L3.49976 19.5C3.49976 20.6046 4.39519 21.5 5.49976 21.5H18.4998C19.6043 21.5 20.4998 20.6046 20.4998 19.5V11.5"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linejoin="round"
	/>
	<path
		d="M15.4998 6L15.1224 3.35858C15.0521 2.86593 14.6301 2.5 14.1325 2.5H9.86708C9.36943 2.5 8.94751 2.86593 8.87713 3.35858L8.49979 6"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linejoin="round"
	/>
</svg>
