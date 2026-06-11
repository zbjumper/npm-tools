# Time 时间

时间格式化工具函数。

## 引入

```ts
import { getTimeAgo, formatTime } from '@zbkit/tools'
```

## getTimeAgo

将秒级 Unix 时间戳转换为相对时间文本。

```ts
function getTimeAgo(pastTime: number | string): string
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `pastTime` | `number \| string` | 是 | 秒级 Unix 时间戳（如 `1700000000`） |

### 返回值

| 类型 | 说明 |
|------|------|
| `string` | 相对时间文本，如 `"1小时 5分3秒"`、`"3分20秒"`、`"45秒"`。输入不合法时返回空字符串 |

### 格式说明

- 超过 1 小时：`"X小时 Y分Z秒"`
- 不足 1 小时但超过 1 分钟：`"X分Y秒"`
- 不足 1 分钟：`"X秒"`

### 示例

```ts
// 假设现在是 2024-01-01 12:00:00
const oneHourAgo = Math.floor(Date.now() / 1000) - 3600
getTimeAgo(oneHourAgo) // => "1小时 0分0秒"

const fiveMinAgo = Math.floor(Date.now() / 1000) - 300
getTimeAgo(fiveMinAgo) // => "5分0秒"

getTimeAgo(0)    // => ""（不合法输入）
getTimeAgo(-1)   // => ""
getTimeAgo('abc') // => ""
```

## formatTime

将毫秒时间戳格式化为 `"YYYY/MM/DD HH:mm:ss"` 格式的字符串。

```ts
function formatTime(timestamp: number | string): string
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `timestamp` | `number \| string` | 是 | 毫秒时间戳（如 `1700000000000`） |

### 返回值

| 类型 | 说明 |
|------|------|
| `string` | 格式化后的时间字符串，格式为 `"YYYY/MM/DD HH:mm:ss"` |

### 示例

```ts
formatTime(1700000000000) // => "2023/11/14 22:13:20"（取决于时区）

// 当前时间
formatTime(Date.now()) // => "2024/01/01 12:00:00"

// 字符串输入
formatTime('1700000000000') // => "2023/11/14 22:13:20"
```
