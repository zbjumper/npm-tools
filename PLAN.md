# PLAN — @zbkit/tools VitePress 文档系统

## 概述

为 `@zbkit/tools` 工具库创建完整的中文 API 接口文档，基于 VitePress 构建文档站点，通过 Docker Compose（`node-builder` + `nginx:1.28-alpine`）部署到阿里云服务器，访问路径 `http://<ip>/zbkit/tools/`。

---

## 一、API 清单总结

从 `src/` 中提取的所有暴露 API，按模块分类：

### 1. Array 模块 (`src/array.ts`) — 数组工具函数

| API | 签名 | 说明 |
|-----|------|------|
| `first` | `<T>(array: T[]): T \| undefined` | 返回数组第一个元素 |
| `last` | `<T>(array: T[]): T \| undefined` | 返回数组最后一个元素 |
| `find` | `<T>(array: T[], predicate): T \| undefined` | 返回满足条件的第一个元素 |
| `findLast` | `<T>(array: T[], predicate): T \| undefined` | 返回满足条件的最后一个元素 |
| `min` | `<T>(array: T[], compareFn): T \| undefined` | 返回数组中最小元素 |
| `max` | `<T>(array: T[], compareFn): T \| undefined` | 返回数组中最大元素 |
| `intersection` | `<T>(array1: T[], array2: T[], isEqual?): T[]` | 两个数组的交集 |
| `union` | `<T>(array1: T[], array2: T[], isEqual?): T[]` | 两个数组的并集 |
| `difference` | `<T>(array1: T[], array2: T[], isEqual?): T[]` | 两个数组的差集 |

### 2. Guard 模块 (`src/guard.ts`) — 断言函数

| API | 签名 | 说明 |
|-----|------|------|
| `guard` | `(condition: unknown, msg?: string \| Error): asserts condition` | 断言条件为真，否则抛出错误 |
| `guardNotNullish` | `(value: unknown): asserts value is NonNullable<unknown>` | 断言值非 null/undefined |
| `guardNullish` | `(value: unknown): asserts value is null \| undefined` | 断言值为 null/undefined |
| `guardInstanceof` | `<T>(value: unknown, constructor): InstanceType<T>` | 断言值为指定类的实例 |

### 3. Objects 模块 (`src/objects.ts`) — 对象操作

| API | 签名 | 说明 |
|-----|------|------|
| `deepCopy` | `<T>(obj: T): T` | 对象深拷贝（支持 Date、Array） |
| `mergeObjects` | `<TTarget, TSource>(target, source): DeepMerge<TTarget, TSource>` | 深度合并对象 |
| `DeepMerge` | 类型 | 深度合并的类型定义 |

### 4. Time 模块 (`src/time.ts`) — 时间格式化

| API | 签名 | 说明 |
|-----|------|------|
| `getTimeAgo` | `(pastTime: number \| string): string` | 秒级时间戳 → 相对时间文本（如"1小时 5分3秒"） |
| `formatTime` | `(timestamp: number \| string): string` | 毫秒时间戳 → "YYYY/MM/DD HH:mm:ss" |

### 5. Type 模块 (`src/type.ts`) — 类型守卫与类型定义

| API | 签名 | 说明 |
|-----|------|------|
| `nullish` | `<T>(value: T \| null \| undefined): value is null \| undefined` | 判断值是否为 null/undefined |
| `notNullish` | `<T>(value: T \| null \| undefined): value is T` | 判断值是否非 null/undefined |
| `ClassConstructor` | 类型 | 通用类构造函数类型 |
| `ReadWriteFunction` | 类型 | 读写函数类型（getter/setter） |
| `Nullable` | 类型 | `T \| null \| undefined` |

### 6. Regexp 模块 (`src/regexp.ts`) — 常用正则

| API | 说明 |
|-----|------|
| `regexps.url` | 匹配 URL（支持 http/https/ftp/ssh/git/ws 等协议） |
| `regexps.email` | 匹配邮箱地址 |
| `regexps.phone` | 匹配中国大陆手机号 |
| `regexps.idCard` | 匹配中国大陆身份证号（15/18位） |

### 7. Math 模块 (`src/math/`) — 数学工具

| API | 签名 | 说明 |
|-----|------|------|
| `keepNDecimalPlaces` | `(num: number \| string, n: number): string` | 保留 n 位小数（四舍五入，不足补零） |
| `calculateYOnLine` | `(p1: Point, p2: Point, x: number): number` | 已知直线两点，计算给定 x 的 y 值 |
| `Point` | `class { x: number; y: number }` | 二维坐标点类 |

**总计：9 个数组函数 + 4 个断言函数 + 2 个对象函数 + 2 个时间函数 + 2 个类型守卫 + 4 个正则 + 2 个数学函数 + 1 个类 + 5 个类型导出 = 31 个 API**

---

## 二、VitePress 文档结构规划

### 目录结构

```
docs/
├── index.md                          # 首页（Hero 布局）
├── guide/
│   └── getting-started.md            # 快速开始
├── api/
│   ├── array.md                      # Array 模块
│   ├── guard.md                      # Guard 模块
│   ├── objects.md                    # Objects 模块
│   ├── time.md                       # Time 模块
│   ├── type.md                       # Type 模块
│   ├── regexp.md                     # Regexp 模块
│   └── math.md                       # Math 模块
├── .vitepress/
│   ├── config.ts                     # VitePress 配置
│   └── cache/                        # 构建缓存（gitignore）
└── .vitepress/dist/                  # 构建产物（gitignore）
```

### API 文档页面标准格式

```markdown
# 模块名

模块简介。

## 引入

```ts
import { fn } from '@zbkit/tools'
```

## functionName

函数描述。

```ts
function functionName<T>(param: Type): ReturnType
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `param` | `Type` | 是 | 说明 |

### 返回值

| 类型 | 说明 |
|------|------|
| `ReturnType` | 说明 |

### 示例

```ts
import { functionName } from '@zbkit/tools'

// 代码示例
```
```

---

## 三、VitePress 配置计划 (`docs/.vitepress/config.ts`)

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "@zbkit/tools",
  description: "TypeScript 实用工具库",
  base: '/zbkit/tools/',
  lang: 'zh-CN',

  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API 参考', link: '/api/array' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: 'Array 数组', link: '/api/array' },
            { text: 'Guard 断言', link: '/api/guard' },
            { text: 'Objects 对象', link: '/api/objects' },
            { text: 'Time 时间', link: '/api/time' },
            { text: 'Type 类型', link: '/api/type' },
            { text: 'Regexp 正则', link: '/api/regexp' },
            { text: 'Math 数学', link: '/api/math' },
          ]
        }
      ]
    },

    outline: { label: '页面导航', level: [2, 3] },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zbjumper/npm-tools' }
    ],

    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © Bill Zhang'
    },
  }
})
```

---

## 四、Docker 部署方案

### 文件结构

```
项目仓库（本地开发机）/
├── docs/Dockerfile              # 文档专用多阶段构建
├── docs/nginx.conf              # Nginx 配置
├── package.json                 # 新增 dk-build / dk-push 脚本
└── README.md                    # 新增服务器部署 docker-compose.yml 示例

阿里云服务器/
└── docker-compose.yml           # 手动维护（参考 README.md 中的示例）
```

### Dockerfile (`docs/Dockerfile`)

基于参考 Dockerfile 模式，使用 `node-builder:1.0.0-rc.1` 构建：

```dockerfile
FROM node-builder:1.0.0-rc.1 AS builder

LABEL maintainer="Bill Zhang <zbjumper@gmail.com>"

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN apk add --no-cache --virtual .build-deps \
    && echo "y" | pnpm approve-builds \
    && pnpm install --frozen-lockfile \
    && apk del .build-deps

COPY . .

RUN pnpm run docs:build

FROM nginx:1.28-alpine AS production

COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html/zbkit/tools
COPY docs/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Nginx 配置 (`docs/nginx.conf`)

基于参考 nginx.conf，站点部署在 `/zbkit/tools/` 子路径：

```nginx
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  # gzip 压缩
  gzip on;
  gzip_vary on;
  gzip_min_length 1024;
  gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml image/svg+xml;

  # 静态资源缓存
  location /zbkit/tools/assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # SPA 回退 — 404 时返回 index.html
  location /zbkit/tools/ {
    try_files $uri $uri/ /zbkit/tools/index.html;
  }

  # 安全头
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-Content-Type-Options "nosniff" always;
}
```

### 服务器 docker-compose.yml 示例（写入 `README.md`）

在 `README.md` 中新增 **部署** 章节，提供 docker-compose.yml 示例供服务器参考：

```yaml
services:
  npm-tools:
    image: registry.cn-hangzhou.aliyuncs.com/zbjumper/npm-tools:latest
    container_name: npm-tools-docs
    restart: unless-stopped
    ports:
      - "8080:80"
```

### npm scripts（封装 Docker 构建/推送）

在 `package.json` 中新增 `dk-build` 和 `dk-push` 脚本，从 `package.json` 自动读取版本号：

```jsonc
{
  "scripts": {
    // ... 已有 scripts ...
    "dk-build": "VERSION=$(node -p \"require('./package.json').version\") && docker build -t npm-tools:$VERSION -f docs/Dockerfile . && docker tag npm-tools:$VERSION registry.cn-hangzhou.aliyuncs.com/zbjumper/npm-tools:$VERSION",
    "dk-push": "VERSION=$(node -p \"require('./package.json').version\") && docker push registry.cn-hangzhou.aliyuncs.com/zbjumper/npm-tools:$VERSION"
  }
}
```

**脚本说明：**

| 脚本 | 功能 |
|------|------|
| `dk-build` | 从 `package.json` 读取版本号 → `docker build` 构建镜像 `npm-tools:<version>` → `docker tag` 打上阿里云镜像仓库标签 |
| `dk-push` | 推送当前版本镜像到 `registry.cn-hangzhou.aliyuncs.com/zbjumper/npm-tools:<version>` |

### 完整工作流

```bash
# === 本地开发机 ===

# 1. 本地开发预览
pnpm run docs:dev

# 2. 本地构建验证
pnpm run docs:build

# 3. Docker 构建（自动读取 package.json version）
pnpm run dk-build

# 4. 推送到阿里云镜像仓库
pnpm run dk-push

# === 阿里云服务器（ssh 登录后）===

# 5. 拉取最新镜像并重启
docker compose pull && docker compose up -d

# 访问 http://<ip>:8080/zbkit/tools/
```

---

## 五、执行步骤

| 步骤 | 任务 | 文件 |
|------|------|------|
| 1 | 删除 VitePress 默认模板文件 | 删除 `docs/api-examples.md`, `docs/markdown-examples.md` |
| 2 | 重写首页 | `docs/index.md` |
| 3 | 创建快速开始指南 | `docs/guide/getting-started.md` |
| 4 | 创建 7 个 API 模块文档 | `docs/api/{array,guard,objects,time,type,regexp,math}.md` |
| 5 | 更新 VitePress 配置 | `docs/.vitepress/config.ts` |
| 6 | 创建 Dockerfile | `docs/Dockerfile` |
| 7 | 创建 nginx.conf | `docs/nginx.conf` |
| 8 | 新增 dk-build / dk-push 脚本 | `package.json` |
| 9 | 在 README.md 中添加服务器部署 docker-compose 示例 | `README.md` |
| 10 | 验证 `pnpm run docs:build` 构建通过 | — |
| 11 | 验证 `pnpm run docs:dev` 本地预览正常 | — |
| 12 | 执行单元测试确认无回归 | `pnpm run test` |

**总计：删除 2 文件 + 新增 ~11 文件 + 修改 3 文件（`config.ts` + `package.json` + `README.md`）**

---

## 六、关键决策记录

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 文档语言 | 仅中文 | 用户指定 |
| 部署路径 | `/zbkit/tools/` | 用户指定 IP 直接访问，子路径区分服务 |
| 构建基础镜像 | `node-builder:1.0.0-rc.1` | 复用已有构建镜像，与参考 Dockerfile 一致 |
| 生产基础镜像 | `nginx:1.28-alpine` | 与参考 Dockerfile 一致 |
| 编排方式 | docker-compose | 用户要求，便于管理 |
| npm scripts | `dk-build` / `dk-push` | 封装 Docker 构建推送，版本自动读取自 `package.json` |
| 镜像名 | `npm-tools` | 用户指定 |
| 镜像仓库 | `registry.cn-hangzhou.aliyuncs.com/zbjumper/` | 阿里云镜像服务，与用户其他项目一致 |
| 搜索 | VitePress 本地搜索 | 文档量小，无需 Algolia |
| Logo | 默认 VitePress Logo | 用户指定 |
| CI/CD | 不需要 | 用户指定 |
