FROM node:18-alpine as build-backend

WORKDIR /usr/src/app

COPY --chown=node:node api/package*.json ./

RUN npm ci

COPY --chown=node:node api .

RUN npm run build




FROM node:18-alpine as build-frontend

WORKDIR /usr/src/app

COPY --chown=node:node frontend/package*.json ./

RUN npm install

COPY --chown=node:node frontend .

RUN npm run build





FROM node:18-alpine as prod

WORKDIR /usr/src/app

COPY --from=build-backend /usr/src/app/dist /usr/src/app
COPY --from=build-frontend /usr/src/app/dist /usr/src/app/static


COPY --chown=node:node api/package*.json ./
RUN npm ci


CMD [ "node", "main.js" ]