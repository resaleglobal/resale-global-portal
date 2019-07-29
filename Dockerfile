FROM nginx:1.15.2-alpine

RUN apk add --update nodejs nodejs-npm
RUN mkdir /var/www

COPY portal/ ./portal

RUN cd portal/ && rm -rf node_modules/ && npm install && npm run build:prod
RUN cp -rp ./portal/build/* /var/www/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
ENTRYPOINT ["nginx","-g","daemon off;"]