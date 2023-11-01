# build front-end
FROM node:lts-alpine AS builder

RUN apk add libtool automake autoconf nasm
RUN npm install pnpm@8 -g

COPY . /blog
WORKDIR /blog

RUN pnpm install --frozen-lockfile
RUN pnpm build

# service
FROM nginx:alpine

ENV TZ=Asia/Shanghai

COPY --from=builder /blog/public /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
