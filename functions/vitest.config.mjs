import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: 'src',
  test: {
    dir: 'test',
    coverage: {
      reportsDirectory: '../coverage',
      provider: 'v8',
      exclude: [
        '**/**/index.ts',
        'app.ts',
        'core/dtos/*.ts',
        'core/interfaces/*.ts',
        'external/routes/*.ts',
        'external/schemas/*.ts'
      ],
    },
    setupFiles: ['../test/setup.ts'],
    include: ['**/(*.)?{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'coverage', 'lib', '.idea', '.git', 'cache']
  }
});
