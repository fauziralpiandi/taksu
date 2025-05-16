import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/__tests__/**', '**/*.d.ts'],
    },
  },
});
