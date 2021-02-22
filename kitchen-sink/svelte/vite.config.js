// eslint-disable-next-line
import svelte from 'rollup-plugin-svelte';
import path from 'path';

const buildFolder = process.env.NODE_ENV === 'production' ? 'packages' : 'build';

export default {
  plugins: [svelte()],
  root: './',
  base: '',
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    assetsInlineLimit: 0,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      framework7: path.resolve(__dirname, `../../${buildFolder}/core`),
      'framework7-svelte': path.resolve(__dirname, `../../${buildFolder}/svelte`),
    },
  },
};
