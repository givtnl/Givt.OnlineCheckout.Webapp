FROM node:latest as node

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:alpine

## COPY nginx.conf /etc/nginx/conf.d/default.conf ## Required by Angular to handle routing for different localizations eg: EN/NL/DE/EN-US/EN-GB
#### Have to still make this translations thing work - Set "localize": true in angular.json to build different locales...

COPY --from=node /app/dist/givt-online-checkout /usr/share/nginx/html

EXPOSE 80