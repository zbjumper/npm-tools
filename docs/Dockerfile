FROM node-builder:1.0.0-rc.1 AS builder

LABEL maintainer="Bill Zhang <zbjumper@gmail.com>"

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN apk add --no-cache --virtual .build-deps \
    && echo "y" | pnpm approve-builds \
    && pnpm install --frozen-lockfile \
    && apk del .build-deps

COPY docs/.vitepress docs/.vitepress
COPY docs/api docs/api
COPY docs/guide docs/guide
COPY docs/index.md docs/

RUN pnpm run docs:build

FROM nginx:1.28-alpine AS production

COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html/zbkit/tools
COPY docs/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
