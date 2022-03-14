FROM givt/angular-internationalized-nginx-image

WORKDIR /home/site/wwwroot

COPY ./dist/givt-online-checkout ./