FROM node:26-alpine3.23 AS frontend

COPY --from=ghcr.io/pnpm/pnpm:12-alpine /opt/pnpm /opt/pnpm
RUN ln -s /opt/pnpm/pnpm /usr/local/bin/pnpm

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . ./

RUN pnpm build

FROM nginx:1.13.8-alpine

COPY ./frontend.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /app/dist/ /usr/share/nginx/html