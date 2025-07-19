import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/test/test-unit',
        }
      }, {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/test/test-end-to-end/controller',
          environment:'src/test/test-end-to-end/prisma/prisma-test-environment.ts',
        }
      }
    ]
  }
})