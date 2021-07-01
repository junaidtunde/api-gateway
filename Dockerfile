FROM autochek/base-images:alpine-node-grpc

RUN mkdir -p /home/micro-api-gateway

COPY . /home/micro-api-gateway

WORKDIR /home/micro-api-gateway

EXPOSE 4020

RUN apk add curl

ADD docker-entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["sh", "/usr/local/bin/docker-entrypoint.sh"]


