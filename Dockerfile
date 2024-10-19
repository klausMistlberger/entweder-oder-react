FROM node:lts AS deps
WORKDIR /app

COPY package*.json .

RUN npm ci

FROM node:lts AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:lts-alpine AS prod
WORKDIR /app

EXPOSE 3000

COPY --from=build /app/build .
RUN npm i -g serve

CMD ["serve", "-s", "."]
