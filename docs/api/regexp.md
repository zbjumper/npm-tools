# Regexp 正则

常用的正则表达式集合，用于校验常见的数据格式。

## 引入

```ts
import { regexps } from '@zbkit/tools'
```

## regexps

包含多个常用正则表达式的对象。

```ts
const regexps = {
  url: RegExp
  email: RegExp
  phone: RegExp
  idCard: RegExp
}
```

### 属性列表

| 属性 | 正则 | 说明 | 匹配示例 |
|------|------|------|----------|
| `url` | `/^(https?\|ftp\|file\|irc\|ssh\|git\|svn\|ws\|wss):\/\/[^\s/$.?#].[^\s]*$/i` | URL 地址 | `https://example.com`、`ftp://files.server.com/data`、`git@github.com` |
| `email` | `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` | 邮箱地址 | `user@example.com`、`test.name+tag@domain.co` |
| `phone` | `/^1[3-9]\d{9}$/` | 中国大陆手机号 | `13800138000` |
| `idCard` | 支持 15 位和 18 位身份证 | 中国大陆身份证号 | `110101199001011234`、`110101900101123` |

### 示例

```ts
// URL 校验
regexps.url.test('https://www.example.com')  // => true
regexps.url.test('ftp://files.server.com')   // => true
regexps.url.test('not-a-url')                // => false

// 邮箱校验
regexps.email.test('user@example.com')  // => true
regexps.email.test('invalid-email')     // => false

// 手机号校验
regexps.phone.test('13800138000') // => true
regexps.phone.test('12345678901') // => false
regexps.phone.test('1380013800')  // => false（位数不足）

// 身份证号校验
regexps.idCard.test('110101199001011234') // => true
regexps.idCard.test('12345')              // => false
```
