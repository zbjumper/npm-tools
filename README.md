# @zbkit/tools

A TypeScript utility library — array operations, object deep copy/merge, type guards, time formatting, math helpers, and common regex patterns.

## Development

- Install dependencies:

```bash
pnpm install
```

- Run the unit tests:

```bash
pnpm run test
```

- Build the library:

```bash
pnpm run build
```

## Documentation

本地预览文档：

```bash
pnpm run docs:dev
```

构建文档：

```bash
pnpm run docs:build
```

## 部署

文档通过 Docker Compose 部署到阿里云服务器，访问路径 `http://<ip>:8080/zbkit/tools/`。

### 本地构建和推送镜像

```bash
# 构建 Docker 镜像（自动读取 package.json 中的版本号）
pnpm run dk-build

# 推送到阿里云镜像仓库
pnpm run dk-push
```

### 服务器部署

在服务器上创建 `docker-compose.yml`：

```yaml
services:
  npm-tools:
    image: registry.cn-hangzhou.aliyuncs.com/zbjumper/npm-tools:latest
    container_name: npm-tools-docs
    restart: unless-stopped
    ports:
      - "8080:80"
```

启动服务：

```bash
docker compose pull && docker compose up -d
```

### 完整工作流

```bash
# === 本地开发机 ===
pnpm run dk-build    # 构建镜像
pnpm run dk-push     # 推送到阿里云

# === 阿里云服务器 ===
docker compose pull && docker compose up -d   # 拉取最新镜像并重启

# 访问 http://<ip>:8080/zbkit/tools/
```
