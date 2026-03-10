import { defineConfig } from 'tsdown'

export default defineConfig({
  tsconfig: 'tsconfig.app.json',
  dts: {
    tsgo: true,
  },
  exports: true,
  // ...config options
})
