import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  target: 'ES2020',
  outDir: 'dist',
  dts: true,
  clean: true,
  minify: true,
  splitting: true,
  // sourcemap: true,
  treeshake: true,
  esbuildOptions(options) {
    options.footer = {
      js: 'if (import.meta.main) Object.assign(globalThis, exports);',
    };
  },
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
});
