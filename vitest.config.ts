// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    exclude: ['node_modules'],
    include: ['tests/**/*.(test|spec).{js,jsx,ts,tsx}'],
    environment: 'node',
    testTimeout: 20000,
    hookTimeout: 25000,
    teardownTimeout: 60000,
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      clean: false,
      reporter: ['lcov'],
      include: ['/__tests?__/[^/]*\\.jsx?$'],
      exclude: [],
    },
  },
});
