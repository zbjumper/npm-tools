# Objects 对象

对象深拷贝与深度合并工具。

## 引入

```ts
import { deepCopy, mergeObjects } from '@zbkit/tools'
import type { DeepMerge } from '@zbkit/tools'
```

## deepCopy

递归深拷贝对象，支持 `Date` 和 `Array` 类型。

```ts
function deepCopy<T>(obj: T): T
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `obj` | `T` | 是 | 需要深拷贝的对象 |

### 返回值

| 类型 | 说明 |
|------|------|
| `T` | 拷贝后的全新对象，与原对象完全独立 |

### 示例

```ts
const original = { a: 1, b: { c: 2 }, d: [3, 4], e: new Date() }
const copy = deepCopy(original)

copy.b.c = 99
console.log(original.b.c) // => 2（原对象不受影响）

copy.d.push(5)
console.log(original.d) // => [3, 4]
```

## mergeObjects

深度合并两个对象，源对象的属性递归合并到目标对象中，保留目标对象的原有属性。

```ts
function mergeObjects<TTarget, TSource>(
  target: TTarget,
  source: TSource
): DeepMerge<TTarget, TSource>
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `target` | `Record<string, unknown>` | 是 | 目标对象 |
| `source` | `Record<string, unknown>` | 是 | 源对象（可包含新增属性） |

### 返回值

| 类型 | 说明 |
|------|------|
| `DeepMerge<TTarget, TSource>` | 合并后的新对象（不修改原对象） |

### 合并规则

- 两个值都是普通对象时，递归合并
- 源值是数组时，直接覆盖（不合并数组元素）
- 其他情况，源值覆盖目标值

### 示例

```ts
const defaults = {
  theme: 'light',
  layout: { sidebar: true, header: { height: 60 } },
  plugins: ['a']
}

const userConfig = {
  theme: 'dark',
  layout: { header: { height: 80, sticky: true } }
}

const config = mergeObjects(defaults, userConfig)
// => {
//   theme: 'dark',
//   layout: { sidebar: true, header: { height: 80, sticky: true } },
//   plugins: ['a']
// }
```

## DeepMerge

深度合并的类型定义，用于推导 `mergeObjects` 的返回值类型。

```ts
type DeepMerge<TTarget, TSource>
```

### 说明

这是一个纯类型工具，用于在 TypeScript 中表达深度合并后的类型结构。对于数组类型，源类型直接覆盖目标类型。
