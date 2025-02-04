<script>
	import CalendarIcon from '../icons/calendarIcon.svelte';
	import IconButton from './button/iconButton.svelte';
</script>

<div class="wrapper">
	<p class="current">Jan 25</p>
	<IconButton>
		<CalendarIcon color="var(--color-text-low)" />
	</IconButton>
</div>

<style lang="scss">
	.wrapper {
		background-color: var(--color-surface-low);
		padding: 8px 18px 0;
		display: flex;
		align-items: center;

		.current {
			flex: 1 1 auto;
			font-size: 16px;
			color: var(--color-text-low);
			font-weight: 500;
		}
	}
</style>
