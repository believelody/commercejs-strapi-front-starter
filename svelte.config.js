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
		vite: {
			vite: { optimizeDeps: { include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep'] } },
			ssr: {
				noExternal: ["svelte-stripe-js"],
			}
		},
		files: {
			lib: "src/lib",
			routes: "src/routes",
		}
	}
};

export default config;
