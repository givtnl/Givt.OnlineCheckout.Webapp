FROM nginx:mainline-alpine-perl
RUN mkdir -p /home/site/wwwroot
COPY conf /etc/nginx
COPY ./dist/givt-online-checkout /home/site/wwwroot