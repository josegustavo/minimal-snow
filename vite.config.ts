import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'MinimalSnow', // Global variable name for UMD build
            fileName: (format) => `minimal-snow.${format}.js`,
        },

        rollupOptions: {
            // Ensure external dependencies are not bundled (none in this case)
            external: [],
            output: {
                globals: {},
            },
        },
    },
    plugins: [dts({ insertTypesEntry: true })],
});