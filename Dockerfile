FROM node:alpine

WORKDIR /tmp

COPY package.json .
COPY . /tmp
RUN npm install && \
    npm run build

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json .
RUN npm install && \
    mv /tmp/build/* . && \
    rm -r /tmp/*

RUN mkdir /usr/config

ENV CONFIG_PATH=/usr/config/config.json

EXPOSE 80
EXPOSE 443

VOLUME ["/usr/src/app/files"]
VOLUME ["/usr/src/app/database"]
VOLUME ["/usr/config"]

CMD ["/usr/local/bin/node", "./server.js"]