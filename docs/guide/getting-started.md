# 快速开始

## 安装

```bash
npm install @zbkit/tools
```

```bash
pnpm add @zbkit/tools
```

```bash
yarn add @zbkit/tools
```

## 使用

```ts
import { first, last, deepCopy, nullish, regexps } from '@zbkit/tools'

// 数组操作
first([1, 2, 3]) // => 1
last([1, 2, 3])  // => 3

// 对象深拷贝
const copy = deepCopy({ a: 1, b: { c: 2 } })

// 类型守卫
nullish(null)      // => true
nullish(undefined) // => true
nullish(0)         // => false

// 正则校验
regexps.email.test('test@example.com') // => true
regexps.phone.test('13800138000')      // => true
```

## 模块一览

| 模块 | 说明 |
|------|------|
| [Array](/api/array) | 数组工具函数：first、last、find、findLast、min、max、intersection、union、difference |
| [Guard](/api/guard) | 断言函数：guard、guardNotNullish、guardNullish、guardInstanceof |
| [Objects](/api/objects) | 对象操作：deepCopy、mergeObjects |
| [Time](/api/time) | 时间格式化：getTimeAgo、formatTime |
| [Type](/api/type) | 类型守卫与类型定义：nullish、notNullish、Nullable、ClassConstructor |
| [Regexp](/api/regexp) | 常用正则：url、email、phone、idCard |
| [Math](/api/math) | 数学工具：keepNDecimalPlaces、calculateYOnLine、Point |

## 环境要求

- Node.js >= 22.18.0
- 支持 ESM 的构建环境
