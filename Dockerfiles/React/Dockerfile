FROM alpine

COPY ./ /react
WORKDIR /react

RUN apk add npm \
 && npm config set unsafe-perm true \
 && npm i -g serve \
 && npm i \
 && npm run build

CMD serve -s build/
