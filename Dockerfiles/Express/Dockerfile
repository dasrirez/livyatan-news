FROM alpine

COPY ./ /express
WORKDIR /express

RUN apk add npm \
 && npm config set unsafe-perm true \
 && npm i

CMD node src/server.js
