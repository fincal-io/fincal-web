import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
	plugins: [basicSsl(), sveltekit()],
	server: {
		proxy: {
			'/api/': {
				target: 'http://localhost:8080',
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
});
