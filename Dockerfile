FROM nginx:mainline-alpine-perl

# COPY index.html /usr/share/nginx/html
# Copy the default extended nginx config files
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# Copy the built files
COPY ./dist/givt-online-checkout /usr/share/nginx/html
# Copy the Stripe/ApplePay apple-developer-merchantid-domain-association
COPY ./.well-known /usr/share/nginx/html/.well-known

EXPOSE 80
