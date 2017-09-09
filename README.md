# Tcloud

[![Greenkeeper badge](https://badges.greenkeeper.io/Lunik/tcloud.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/tcloud.svg)](https://www.npmjs.com/package/tcloud)
[![Travis branch](https://img.shields.io/travis/Lunik/tcloud/master.svg)](https://travis-ci.org/Lunik/tcloud)
[![Dependency Status](https://gemnasium.com/badges/github.com/Lunik/tcloud.svg)](https://gemnasium.com/github.com/Lunik/tcloud)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## ===== View =====

![App-view](https://i.imgur.com/BsmiKID.png)

## ===== Installation =====

## Standalone

Get the last release from https://github.com/Lunik/tcloud/releases
```
$ wget https://github.com/Lunik/tcloud/releases/download/v0.2.6/tcloud-v0.2.6.tgz
```

Uncompress the tarball and cd into
```
$ tar zxf tcloud-v0.2.6.tgz
$ cd tcloud-v0.2.6
```

Install dependencies
```
$ npm install --production
```

### Run
```
$ node server.js
```

## With Docker
[![Docker Stars](https://img.shields.io/docker/stars/lunik/tcloud.svg)](https://hub.docker.com/r/lunik/tcloud/)
[![Docker Pulls](https://img.shields.io/docker/pulls/lunik/tcloud.svg)](https://hub.docker.com/r/lunik/tcloud/)
[![](https://images.microbadger.com/badges/image/lunik/tcloud.svg)](https://microbadger.com/images/lunik/tcloud "Get your own image badge on microbadger.com")

```
$ docker pull lunik/tcloud
$ docker run -d \
	-p 5000:5000 \
	-v /some/path/:/usr/src/app/
	lunik/tcloud
```

## ===== Configuration =====
Modify `config.json`
On first installation, this file could be missing. Run the app once and it will appear.
The default config is:
```
{
  "log": {
    "path": "logs/"
  },
  "server": {
    "port": 5000,
    "masterKey": "mymasterkey",
    "https": false,
    "hostname": "",
    "certs": {
      "privatekey": "",
      "certificate": "",
      "chain": ""
    }
  },
  "database": {
    "path": "database/"
  },
  "authentification": false,
  "files": {
    "path": "files/"
  }
}
```
