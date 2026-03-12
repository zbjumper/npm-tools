import { defineConfig } from "tsdown";

export default defineConfig({
  tsconfig: "tsconfig.app.json",
  dts: {
    tsgo: true,
  },
  platform: "neutral",
  exports: true,
  alias: {
    "@": "./src",
  },
  // ...config options
});
