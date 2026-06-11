# Math 数学

数学计算工具函数。

## 引入

```ts
import { keepNDecimalPlaces, calculateYOnLine, Point } from '@zbkit/tools'
```

## keepNDecimalPlaces

保留 n 位小数，不足补零，超出位数四舍五入。

```ts
function keepNDecimalPlaces(num: number | string, n: number): string
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `num` | `number \| string` | 是 | 目标数字或数字字符串 |
| `n` | `number` | 是 | 保留的小数位数 |

### 返回值

| 类型 | 说明 |
|------|------|
| `string` | 保留 n 位小数后的字符串，不足补零 |

### 示例

```ts
keepNDecimalPlaces(3.14159, 2)  // => "3.14"
keepNDecimalPlaces(3.1, 4)      // => "3.1000"
keepNDecimalPlaces('2.5', 0)    // => "3"（四舍五入）
keepNDecimalPlaces(100, 2)      // => "100.00"
keepNDecimalPlaces('abc', 2)    // => "NaN"
```

## calculateYOnLine

已知直线上两点，计算给定 x 坐标对应的 y 坐标。

```ts
function calculateYOnLine(p1: Point, p2: Point, x: number): number
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `p1` | `Point` | 是 | 直线上的第一个点 |
| `p2` | `Point` | 是 | 直线上的第二个点 |
| `x` | `number` | 是 | 目标点的 x 坐标 |

### 返回值

| 类型 | 说明 |
|------|------|
| `number` | 目标点的 y 坐标 |

### 注意事项

- 当 `p1.x === p2.x` 时（即直线垂直于 x 轴），斜率为 `Infinity`，返回值为 `Infinity` 或 `-Infinity`。调用方应提前处理该情况。

### 示例

```ts
const p1 = new Point(0, 0)
const p2 = new Point(10, 10)

calculateYOnLine(p1, p2, 5)  // => 5
calculateYOnLine(p1, p2, 3)  // => 3
calculateYOnLine(p1, p2, 7)  // => 7

// 非 45 度直线
const a = new Point(0, 0)
const b = new Point(10, 20)
calculateYOnLine(a, b, 5) // => 10
```

## Point

二维坐标点类。

```ts
class Point {
  x: number
  y: number
  constructor(x: number, y: number)
}
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `x` | `number` | x 坐标 |
| `y` | `number` | y 坐标 |

### 示例

```ts
const point = new Point(3, 4)
console.log(point.x) // => 3
console.log(point.y) // => 4
```
