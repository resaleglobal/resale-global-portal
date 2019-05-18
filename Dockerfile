FROM nginx:1.15.2-alpine

RUN apk add --update nodejs nodejs-npm
RUN mkdir /var/www

COPY portal/ ./portal

RUN cd portal/ && npm install
RUN cd portal/ && npm run build
RUN cp -rp ./portal/build/* /var/www/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
ENTRYPOINT ["nginx","-g","daemon off;"]