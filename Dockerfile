FROM node:18-alpine as base

WORKDIR /src
COPY package*.json ./
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci --legacy-peer-deps
COPY . ./
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install --legacy-peer-deps
COPY . ./
CMD ["nodemon", "bin/www"]
