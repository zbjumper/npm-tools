# Guard 断言

运行时断言函数，用于在代码中快速验证前置条件，失败时抛出异常。配合 TypeScript 的类型收窄（type narrowing），可在断言后获得正确的类型推导。

## 引入

```ts
import { guard, guardNotNullish, guardNullish, guardInstanceof } from '@zbkit/tools'
```

## guard

断言条件为真，否则抛出错误。

```ts
function guard(condition: unknown, msg?: string | Error): asserts condition
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `condition` | `unknown` | 是 | 需要判断的条件 |
| `msg` | `string \| Error` | 否 | 错误信息或 Error 对象，默认抛出空 Error |

### 返回值

| 类型 | 说明 |
|------|------|
| `asserts condition` | 无返回值。当 `condition` 为 `false` 时抛出异常 |

### 示例

```ts
guard(typeof x === 'number', 'x 必须是数字')

guard(value !== null, new TypeError('value 不能为 null'))
```

## guardNotNullish

断言值非 `null` 且非 `undefined`。

```ts
function guardNotNullish(value: unknown): asserts value is NonNullable<unknown>
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `value` | `unknown` | 是 | 要检查的值 |

### 返回值

| 类型 | 说明 |
|------|------|
| `asserts value is NonNullable<unknown>` | 无返回值。当值为 `null` 或 `undefined` 时抛出异常 |

### 示例

```ts
function process(value: string | null) {
  guardNotNullish(value)
  // 此处 value 被收窄为 string
  console.log(value.toUpperCase())
}
```

## guardNullish

断言值为 `null` 或 `undefined`。

```ts
function guardNullish(value: unknown): asserts value is null | undefined
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `value` | `unknown` | 是 | 要检查的值 |

### 返回值

| 类型 | 说明 |
|------|------|
| `asserts value is null \| undefined` | 无返回值。当值不是 `null` 且不是 `undefined` 时抛出异常 |

### 示例

```ts
function expectEmpty(value: unknown) {
  guardNullish(value)
  // 此处 value 被收窄为 null | undefined
}
```

## guardInstanceof

断言值为指定构造函数的实例，否则抛出异常。

```ts
function guardInstanceof<T extends ClassConstructor<any>>(
  value: unknown,
  constructor: T
): InstanceType<T>
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `value` | `unknown` | 是 | 要检查的值 |
| `constructor` | `ClassConstructor<any>` | 是 | 用于判断的构造函数 |

### 返回值

| 类型 | 说明 |
|------|------|
| `InstanceType<T>` | 如果断言通过，返回值为构造函数实例类型 |

### 示例

```ts
class User {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

function processUser(value: unknown) {
  const user = guardInstanceof(value, User)
  // 此处 user 被推导为 User 类型
  console.log(user.name)
}
```
