# stage to install dependencies
FROM node:alpine3.17 AS install-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# stage to continue creating the development
FROM node:alpine3.17 AS develop
WORKDIR /app
ENV NG_OPENAI_API_KEY=${NG_OPENAI_API_KEY} \
    NG_OPENAI_ORGANIZATION_ID=${NG_OPENAI_ORGANIZATION_ID} \
    NG_PEXEL_API_KEY=${NG_PEXEL_API_KEY} \
    NG_FORMSPREE_ID=${NG_FORMSPREE_ID} \
    NG_SECONDS_IN_WHICH_MODAL_SALE_IS_DISPLAYED=${NG_SECONDS_IN_WHICH_MODAL_SALE_IS_DISPLAYED}
COPY --from=install-deps /app/node_modules ./node_modules
COPY . .
EXPOSE 8080
STOPSIGNAL SIGKILL
CMD ["yarn", "dev:docker"]

# stage to create the production build
FROM node:alpine3.17 AS build-prod
WORKDIR /app
ENV NG_OPENAI_API_KEY=${NG_OPENAI_API_KEY} \
    NG_OPENAI_ORGANIZATION_ID=${NG_OPENAI_ORGANIZATION_ID} \
    NG_PEXEL_API_KEY=${NG_PEXEL_API_KEY} \
    NG_FORMSPREE_ID=${NG_FORMSPREE_ID} \
    NG_SECONDS_IN_WHICH_MODAL_SALE_IS_DISPLAYED=${NG_SECONDS_IN_WHICH_MODAL_SALE_IS_DISPLAYED}
COPY --from=install-deps /app/node_modules ./node_modules
COPY nginx/environments /tmp/environments
COPY . .
RUN rm -rf ./src/environments && \
    mv /tmp/environments ./src/
RUN rm -rf ./nginx/environments
# RUN yarn test
RUN yarn build:nginx

# stage to create the image of the app in production
FROM nginx:1.25.0 AS production
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-prod /app/docs /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
STOPSIGNAL SIGKILL
CMD [ "nginx","-g", "daemon off;" ]







