<script lang="ts" module>
	export type MenuOption = {
		label: string;
		id: string;
	};
</script>

<script lang="ts">
	import MenuIcon from '../icons/menuIcon.svelte';

	import { outsideClick } from '../utils/outside-click';
	import IconButton from './button/iconButton.svelte';

	let {
		options = [],
		select = () => {}
	}: { options?: MenuOption[]; select?: (option: MenuOption) => void } = $props();

	let open$ = $state(false);
</script>

<div class="container" use:outsideClick={{ handler: () => (open$ = false) }}>
	<IconButton
		onclick={(e: MouseEvent) => {
			e.stopPropagation();
			open$ = !open$;
		}}
	>
		<MenuIcon size={20} />
	</IconButton>

	<div class="options" class:open={open$}>
		{#each options as option}
			<button class="option" onclick={() => select(option)}>{option.label}</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 4px;

		.options {
			position: absolute;
			top: 45px;
			right: 0;
			z-index: var(--z-index-menu);
			display: flex;
			flex-direction: column;
			background-color: var(--color-container-high);
			border-radius: 4px;
			border: none;
			flex-direction: column;
			display: none;

			&.open {
				display: flex;
			}

			.option {
				padding: 16px 14px;
				font-size: 13px;
				text-align: left;
				cursor: pointer;
				transition: background-color 0.2s ease-in-out;
				background: transparent;
				outline: none;
				border: none;
				border-bottom: 1px solid var(--color-border-form);
				text-wrap: nowrap;

				&:hover {
					background-color: var(--color-container-highest);
				}

				&:first-child {
					border-radius: 4px 4px 0 0;
				}

				&:last-child {
					border-radius: 0 0 4px 4px;
					border: none;
				}
			}
		}
	}
</style>
