<script lang="ts">
	import { assets } from '$app/paths';
	import FilledButton from '../../components/button/filledButton.svelte';
	import TextButton from '../../components/button/textButton.svelte';
</script>

<div class="card-wrapper">
	<div class="card">
		<div class="card-header">
			<img src={`${assets}/fincal_logo.png`} alt="logo" width="32" height="32" />
			<h1>Fincal</h1>
		</div>
		<p class="hint">Personal Wealth Management and Planner</p>

		<div class="content">
			<FilledButton block>Continue with Google</FilledButton>
		</div>

		<div class="actions">
			<TextButton block>Change Server</TextButton>
			<TextButton block>Star on Github ( 5★ )</TextButton>
			<TextButton block>Privacy Policy</TextButton>
		</div>
	</div>
</div>

<style lang="scss">
	.card-wrapper {
		display: grid;
		place-items: center;

		min-height: 100vh;
		width: 100vw;

		padding: 24px;
	}

	.card {
		width: 100%;
		max-width: 420px;
		border: 1px solid var(--md-outline);
		padding: 24px;
		border-radius: 8px;

		display: flex;
		justify-content: start;
		align-items: start;
		flex-direction: column;

		.card-header {
			display: flex;
			align-items: center;
			gap: 18px;
			margin-bottom: 14px;

			img {
				width: 42px;
				height: 42px;
				border-radius: 6px;
			}

			h1 {
				font-size: 24px;
				margin-bottom: 8px;
				font-weight: 600;
				margin: 0;
			}
		}

		p.hint {
			font-size: 15px;
			color: var(--md-on-surface-variant);
			letter-spacing: 0.02em;
			padding-bottom: 20px;
		}

		.content {
			width: 100%;
			padding: 48px 0;
		}

		.actions {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 4px;
		}
	}
</style>
