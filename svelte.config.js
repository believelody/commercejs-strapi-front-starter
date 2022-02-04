import preprocess from 'svelte-preprocess';

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
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			vite: { optimizeDeps: { include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep'] } },
			ssr: {
				noExternal: ["svelte-stripe-js"],
			}
		}
	}
};

export default config;
