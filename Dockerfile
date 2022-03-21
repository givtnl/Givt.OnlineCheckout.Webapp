FROM nginx:mainline-alpine-perl

# COPY index.html /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY ./dist/givt-online-checkout /usr/share/nginx/html

EXPOSE 80