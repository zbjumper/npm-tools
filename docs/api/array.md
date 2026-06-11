# Array 数组

数组工具函数集合，提供常用的数组操作。

## 引入

```ts
import { first, last, find, findLast, min, max, intersection, union, difference } from '@zbkit/tools'
```

## first

返回数组第一个元素。

```ts
function first<T>(array: T[]): T | undefined
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `array` | `T[]` | 是 | 目标数组 |

### 返回值

| 类型 | 说明 |
|------|------|
| `T \| undefined` | 数组第一个元素，如果数组为空则返回 `undefined` |

### 示例

```ts
first([1, 2, 3]) // => 1
first([])         // => undefined
```

## last

返回数组最后一个元素。

```ts
function last<T>(array: T[]): T | undefined
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `array` | `T[]` | 是 | 目标数组 |

### 返回值

| 类型 | 说明 |
|------|------|
| `T \| undefined` | 数组最后一个元素，如果数组为空则返回 `undefined` |

### 示例

```ts
last([1, 2, 3]) // => 3
last([])         // => undefined
```

## find

返回数组中满足条件的第一个元素。

```ts
function find<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `array` | `T[]` | 是 | 目标数组 |
| `predicate` | `(value: T, index: number, array: T[]) => boolean` | 是 | 测试函数，用于判断元素是否满足条件 |

### 返回值

| 类型 | 说明 |
|------|------|
| `T \| undefined` | 满足条件的第一个元素，如果没有则返回 `undefined` |

### 示例

```ts
find([1, 2, 3, 4], v => v > 2)  // => 3
find([1, 2, 3], v => v > 5)     // => undefined
```

## findLast

返回数组中满足条件的最后一个元素。

```ts
function findLast<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `array` | `T[]` | 是 | 目标数组 |
| `predicate` | `(value: T, index: number, array: T[]) => boolean` | 是 | 测试函数，用于判断元素是否满足条件 |

### 返回值

| 类型 | 说明 |
|------|------|
| `T \| undefined` | 满足条件的最后一个元素，如果没有则返回 `undefined` |

### 示例

```ts
findLast([1, 2, 3, 4], v => v > 2) // => 4
findLast([1, 2, 3], v => v > 5)    // => undefined
```

## min

返回数组中最小的元素（根据回调方法比较元素大小）。

```ts
function min<T>(array: T[], compareFn: (a: T, b: T) => number): T | undefined
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `array` | `T[]` | 是 | 目标数组 |
| `compareFn` | `(a: T, b: T) => number` | 是 | 比较函数，返回值小于 0 表示 `a < b` |

### 返回值

| 类型 | 说明 |
|------|------|
| `T \| undefined` | 最小元素，如果数组为空则返回 `undefined` |

### 示例

```ts
const items = [{ v: 3 }, { v: 1 }, { v: 2 }]
min(items, (a, b) => a.v - b.v) // => { v: 1 }
```

## max

返回数组中最大的元素（根据回调方法比较元素大小）。

```ts
function max<T>(array: T[], compareFn: (a: T, b: T) => number): T | undefined
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `array` | `T[]` | 是 | 目标数组 |
| `compareFn` | `(a: T, b: T) => number` | 是 | 比较函数，返回值大于 0 表示 `a > b` |

### 返回值

| 类型 | 说明 |
|------|------|
| `T \| undefined` | 最大元素，如果数组为空则返回 `undefined` |

### 示例

```ts
const items = [{ v: 3 }, { v: 1 }, { v: 2 }]
max(items, (a, b) => a.v - b.v) // => { v: 3 }
```

## intersection

计算两个数组的交集。

```ts
function intersection<T>(array1: T[], array2: T[], isEqual?: (a: T, b: T) => boolean): T[]
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `array1` | `T[]` | 是 | 第一个数组 |
| `array2` | `T[]` | 是 | 第二个数组 |
| `isEqual` | `(a: T, b: T) => boolean` | 否 | 自定义相等判断函数，默认使用严格相等 |

### 返回值

| 类型 | 说明 |
|------|------|
| `T[]` | 两个数组的交集 |

### 示例

```ts
intersection([1, 2, 3], [2, 3, 4]) // => [2, 3]

// 自定义比较
const a = [{ id: 1 }, { id: 2 }]
const b = [{ id: 2 }, { id: 3 }]
intersection(a, b, (x, y) => x.id === y.id) // => [{ id: 2 }]
```

## union

计算两个数组的并集。

```ts
function union<T>(array1: T[], array2: T[], isEqual?: (a: T, b: T) => boolean): T[]
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `array1` | `T[]` | 是 | 第一个数组 |
| `array2` | `T[]` | 是 | 第二个数组 |
| `isEqual` | `(a: T, b: T) => boolean` | 否 | 自定义相等判断函数，默认使用严格相等 |

### 返回值

| 类型 | 说明 |
|------|------|
| `T[]` | 两个数组的并集（去重） |

### 示例

```ts
union([1, 2, 3], [2, 3, 4]) // => [1, 2, 3, 4]
```

## difference

计算两个数组的差集（`array1` 中不在 `array2` 中的元素）。

```ts
function difference<T>(array1: T[], array2: T[], isEqual?: (a: T, b: T) => boolean): T[]
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `array1` | `T[]` | 是 | 第一个数组 |
| `array2` | `T[]` | 是 | 第二个数组 |
| `isEqual` | `(a: T, b: T) => boolean` | 否 | 自定义相等判断函数，默认使用严格相等 |

### 返回值

| 类型 | 说明 |
|------|------|
| `T[]` | `array1` 中不在 `array2` 中的元素组成的数组 |

### 示例

```ts
difference([1, 2, 3], [2, 3, 4]) // => [1]
```
