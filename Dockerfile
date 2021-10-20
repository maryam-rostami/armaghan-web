ARG NODE_ENV=production
ARG SSL_CRT_FILE=www.farabin.news.crt
ARG SSL_KEY_FILE=www.farabin.news.key

# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG NODE_ENV
RUN echo $NODE_ENV
RUN npm run build $NODE_ENV

# deploy stage
FROM nginx:stable-alpine as deployment-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

ARG SSL_CRT_FILE
COPY --from=build-stage /app/config/${SSL_CRT_FILE} /etc/ssl/farabin_crt_file.crt

ARG SSL_KEY_FILE
COPY --from=build-stage /app/config/${SSL_KEY_FILE} /etc/ssl/farabin_crt_file.key

# Copy image of landscape page into docker
COPY --from=build-stage /app/static/farabin.png /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]