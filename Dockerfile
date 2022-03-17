FROM nginx
RUN mkdir -p /home/site/wwwroot
COPY conf /etc/nginx
COPY ./dist/givt-online-checkout /home/site/wwwroot
EXPOSE 80

RUN echo "Ah yeeeeeet"
