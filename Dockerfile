FROM node:alpine
LABEL maintainer="contact@lunik.xyz"

ENV NODE_ENV=production

# Preinstall production dependencies
WORKDIR /usr/src/app
COPY package.json .
RUN npm install && \
    cp ./package.json /tmp && \
    cp -r ./node_modules /tmp

# Build app
ENV NODE_ENV=dev
WORKDIR /tmp

COPY . /tmp
RUN npm install && \
    npm run build && \
    mv ./build/* /usr/src/app && \
    rm -r /tmp/* && \
    npm cache clean --force

ENV NODE_ENV=production

# Configurations
WORKDIR /usr/src/app

# Set config path
RUN mkdir /usr/config
ENV CONFIG_PATH=/usr/config/config.json

# Expose ports
EXPOSE 80
EXPOSE 443

# expose volumes
VOLUME ["/usr/src/app/files"]
VOLUME ["/usr/src/app/logs"]
VOLUME ["/usr/src/app/database"]
VOLUME ["/usr/config"]

# start command
CMD ["/usr/local/bin/node", "./server.js"]