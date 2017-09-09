FROM node:alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json .
RUN npm install &&
    npm run build

COPY ./build .

EXPOSE 80
EXPOSE 443

CMD ["/usr/local/bin/node", "./server.js"]