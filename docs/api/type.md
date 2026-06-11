# Type 类型

类型守卫函数和常用类型定义。

## 引入

```ts
import { nullish, notNullish } from '@zbkit/tools'
import type { Nullable, ClassConstructor, ReadWriteFunction } from '@zbkit/tools'
```

## nullish

判断给定的值是否为 `null` 或 `undefined`。

```ts
function nullish<T>(value: T | null | undefined): value is null | undefined
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `value` | `T \| null \| undefined` | 是 | 需要判断的值 |

### 返回值

| 类型 | 说明 |
|------|------|
| `value is null \| undefined` | 如果值为 `null` 或 `undefined`，返回 `true`，否则返回 `false` |

### 示例

```ts
nullish(null)      // => true
nullish(undefined) // => true
nullish(0)         // => false
nullish('')        // => false
nullish(false)     // => false

// 类型收窄
const value: string | null = null
if (nullish(value)) {
  // 此处 value 被收窄为 null
}
```

## notNullish

判断给定的值是否不是 `null` 且不是 `undefined`。

```ts
function notNullish<T>(value: T | null | undefined): value is T
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `value` | `T \| null \| undefined` | 是 | 需要判断的值 |

### 返回值

| 类型 | 说明 |
|------|------|
| `value is T` | 如果值不是 `null` 且不是 `undefined`，返回 `true`，否则返回 `false` |

### 示例

```ts
notNullish(0)         // => true
notNullish('')        // => true
notNullish(false)     // => true
notNullish(null)      // => false
notNullish(undefined) // => false

// 配合 filter 使用
const values = [1, null, 2, undefined, 3]
const filtered = values.filter(notNullish) // => [1, 2, 3]
// filtered 类型为 number[]
```

## Nullable

表示值可以为 `null` 或 `undefined` 的类型。

```ts
type Nullable<T> = T | null | undefined
```

### 示例

```ts
type User = {
  name: string
  email: Nullable<string>  // 可以是 string、null 或 undefined
}
```

## ClassConstructor

通用类构造函数类型。

```ts
type ClassConstructor<T = any> = new (...args: any[]) => T
```

### 示例

```ts
function createInstance<T>(Ctor: ClassConstructor<T>): T {
  return new Ctor()
}
```

## ReadWriteFunction

读写函数类型，同时支持 getter 和 setter 签名。

```ts
interface ReadWriteFunction<T> {
  (): T          // getter 签名
  (_: T): void   // setter 签名
}
```

### 示例

```ts
// 一个函数同时支持读取和设置
const accessor: ReadWriteFunction<string> = ((val?: string) => {
  if (val === undefined) return 'current'
  // set logic
}) as ReadWriteFunction<string>
```
