FROM node:18-alpine as build
WORKDIR /src

COPY package.json yarn.lock ./
RUN yarn install --development

COPY . .
RUN yarn build

# Using nginx to serve front-end
FROM nginx:alpine as final

EXPOSE 8080
WORKDIR /usr/share/nginx/html/

USER root
RUN chmod -R g+w /var/cache/
RUN chmod -R g+w /var/run/

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy built artifacts
COPY --from=build /src/dist/ ./
