import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

// @filename: index.js
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	images: {
		deviceSizes: [320, 420, 768, 1024, 1200],
		loader: "default",
		domains: ["res.cloudinary.com"],
	},
	kit: {
		adapter: adapter(),
		vite: {
			vite: { optimizeDeps: { include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep'] } },
			ssr: {
				noExternal: ["svelte-stripe-js"],
			},
			resolve: {
				alias: {
					$utils: path.resolve('./src/lib/utils'),
					$elements: path.resolve('./src/lib/elements'),
					$styles: path.resolve('./src/styles'),
					$routes: path.resolve('./src/routes'),
					$components: path.resolve('./src/lib/components'),
					$api: path.resolve('./src/lib/api'),
					$lang: path.resolve('./src/lib/lang'),
				}
			}
		},
		files: {
			lib: "src/lib",
			routes: "src/routes",
		}
	}
};

export default config;
