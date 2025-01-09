import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		extensions: ['.js', '.ts', '.svelte'],
		alias: {
			'@hugeicons/core': '@hugeicons/core/dist'
		}
	},
	optimizeDeps: {
		include: ['@hugeicons/core']
	},
	build: {
		commonjsOptions: {
			include: [/@hugeicons\/svelte/]
		}
	}
});
