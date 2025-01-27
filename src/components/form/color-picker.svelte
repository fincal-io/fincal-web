<script lang="ts">
	import CloseIcon from '../../icons/closeIcon.svelte';
	import IconButton from '../button/iconButton.svelte';

	let {
		value,
		update,
		...rest
	}: {
		update?: (value: string) => void;
		value?: string;
	} = $props();

	let open$ = $state(false);

	const colors = [
		'#FF6B6B',
		'#4ECDC4',
		'#45B7D1',
		'#96CEB4',
		'#FFEEAD',
		'#D4A5A5',
		'#9B6B6B',
		'#E9967A',
		'#A8E6CF',
		'#DCEDC1',
		'#FFD3B6',
		'#86A8E7',
		'#91A8D0',
		'#84B1ED',
		'#78A5A3',
		'#E27D60',
		'#85DCB',
		'#E8A87C',
		'#C38D9E',
		'#41B3A3',
		'#9D8DF1',
		'#B8F7D4',
		'#7FD1B9',
		'#B8B8FF',
		'#C4E3CB',
		'#A6B1E1',
		'#B4F8C8',
		'#FBD1A2',
		'#98DDCA',
		'#D5EEBB',
		'#F7D794',
		'#79A8A9',
		'#84B1ED',
		'#95B8D1',
		'#9EA1D4',
		'#A2A8D3',
		'#A7BEAE',
		'#A1DE93',
		'#B0C4DE',
		'#B5EAD7',
		'#C7CEEA',
		'#D4A5A5',
		'#D5EEBB',
		'#D6E6F2',
		'#D8BFD8',
		'#DABECA',
		'#E0BBE4',
		'#E2D1F9',
		'#E6B8A2',
		'#EAB595',
		'#EDAFB8',
		'#EFE5D5',
		'#F0E6EF',
		'#F1D1D0',
		'#F2D7EE',
		'#F3D1DC',
		'#F4B9B8',
		'#F5CAC3',
		'#F6D6D6',
		'#F7DFD4',
		'#F8E9E9',
		'#F9F1F1',
		'#FAF0E6',
		'#FAEBD7',
		'#FAF0DC',
		'#FBB1BD',
		'#FBC4AB',
		'#FFDAB9',
		'#FDE2E6',
		'#FFB7B2',
		'#FFD5C2',
		'#FFE5D9',
		'#FFF0F5',
		'#FFF1E6',
		'#FFF5E1',
		'#6B5B95',
		'#88B04B',
		'#92A8D1',
		'#955251',
		'#964F4C',
		'#9B4F0F',
		'#A1CAF1',
		'#A2A2D0',
		'#A3C1AD',
		'#A5A5A5',
		'#B565A7',
		'#B9D7D9',
		'#BE9EC9',
		'#C1E1C1',
		'#C3CDE6',
		'#C5E384',
		'#C7D3D4',
		'#CAE7B9',
		'#CB99C9',
		'#CBC3E3',
		'#CADETBLUE',
		'#CORAL',
		'#D3D3D3',
		'#D3BCC0',
		'#D6CBD3'
	];
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="input-wrapper"
	role="button"
	tabindex="0"
	onclick={(e) => {
		e.preventDefault();
		open$ = true;
	}}
>
	<p class:focused={open$}>
		<span class="color" style="background-color: {value || '#000000'}"></span>
	</p>
</div>

<a
	class="nav-background"
	class:open={open$}
	onclick={() => (open$ = false)}
	role="button"
	tabindex="0"
	aria-label="Close bottom sheet"
	href={null}
></a>

<div class="currency-editor-container" class:open={open$}>
	<div class="header">
		<p class="title">Pick a color</p>
	</div>
	<div class="colors">
		{#each colors as color}
			<button
				aria-label="Pick color"
				class="color-wrapper"
				onclick={() => {
					update?.(color);
					open$ = false;
				}}
			>
				<span class="color-block" style="background-color: {color}"></span>
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.input-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		background-color: transparent;
		border-radius: 6px;
		border: 1px solid var(--color-border-variant);
		background-color: var(--color-surface-low);
	}

	p {
		width: 100%;
		padding: 10px 12px;
		border: 1px solid transparent;
		font-size: 16px;
		letter-spacing: 0.01em;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: 4px;

		&.focused {
			outline: none;
			border: 1px solid var(--md-primary);
		}

		.color {
			height: 18px;
			display: block;
			width: 60px;
			border-radius: 4px;
			background-color: white;
		}
	}

	.nav-background {
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

	.currency-editor-container {
		background-color: var(--color-container);
		position: fixed;

		bottom: 0;
		left: 0;
		right: 0;
		height: 600px;
		max-height: calc(100dvh - 60px);

		z-index: var(--z-index-nav);

		display: flex;
		flex-direction: column;

		overflow: hidden auto;

		bottom: calc(60px - 100dvh);
		transition: bottom 0.3s ease-in-out;

		&.open {
			bottom: 0;
		}
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 4px;

		.title {
			font-size: 16px;
			font-weight: 500;
			letter-spacing: 0.02em;
		}
	}

	.colors {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 16px 16px;
		gap: 18px;

		.color-wrapper {
			aspect-ratio: 1;
			border-radius: 6px;
			display: grid;
			place-items: center;
			cursor: pointer;
			outline: none;
			border: none;

			.color-block {
				height: 48px;
				width: 48px;
				border-radius: 4px;
				border: 1px solid var(--color-border-form);
			}
		}
	}
</style>
