# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@zbkit/tools` — a TypeScript utility library published to npm. Provides modular utility functions: array operations, object deep copy/merge, type guards, time formatting, math helpers, and common regex patterns.

## Development Commands

All commands use **pnpm** (required by `engines` in package.json):

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm run test` | Run vitest tests (use `pnpm run test -- <file>` for a single test) |
| `pnpm run build` | Build with tsdown → outputs to `dist/` |
| `pnpm run dev` | Watch mode rebuild |
| `pnpm run typecheck` | Type-check without emitting (`tsc --noEmit`) |
| `pnpm run pub` | Bump version, commit, tag, and publish to npm |

## For AI (MUST CHECK)

- 每次逻辑代码实现新类、新方法后，务必添加单元测试代码
- 每次修改逻辑后，务必执行**单元测试**以验证是否逻辑正确

## Architecture

### Module Structure

All exports are flat-reexported from [src/index.ts](src/index.ts):

```
src/
├── index.ts       # Flat re-exports from all modules
├── array.ts       # first, last, find, findLast, min, max, intersection, union, difference
├── guard.ts       # guard, guardNotNullish, guardNullish, guardInstanceof
├── objects.ts     # deepCopy, mergeObjects (+ DeepMerge type)
├── time.ts        # getTimeAgo (seconds→now), formatTime (ms→"YYYY/MM/DD HH:mm:ss")
├── type.ts        # ClassConstructor, Nullable, nullish, notNullish (type guards)
├── regexp.ts      # regexps object: url, email, phone (CN), idCard (CN)
└── math/
    ├── index.ts   # keepNDecimalPlaces, calculateYOnLine
    └── point.ts   # Point class
```

### Path Alias

`@/*` maps to `./src/*` — configured in both [tsconfig.app.json](tsconfig.app.json) and [vitest.config.ts](vitest.config.ts).

### Build System

- **tsdown** for bundling (see [tsdown.config.ts](tsdown.config.ts))
- Uses `@typescript/native-preview` for `.d.ts` generation (`tsgo: true`)
- Platform: neutral, exports resolution enabled
- Output: `dist/index.js` (ESM), `dist/index.d.mts` (types)

### Testing

- **vitest** with `@` path alias configured in [vitest.config.ts](vitest.config.ts)
- Tests live in [tests/](tests/) as `*.test.ts` files alongside matching source modules
- No test config file — uses vitest defaults

### Publishing

- `prepublishOnly` runs `pnpm run build` automatically
- `pnpm run pub` uses `bumpp` to bump version, create commit + tag, then publish
- Package is published as public (`publishConfig.access: "public"`)
