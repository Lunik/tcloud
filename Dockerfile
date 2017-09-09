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

EXPOSE 80
EXPOSE 443

CMD ["/usr/local/bin/node", "./server.js"]