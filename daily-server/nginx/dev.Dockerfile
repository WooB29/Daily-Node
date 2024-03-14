FROM nginx

RUN mkdir -p /var/log/nginx

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf