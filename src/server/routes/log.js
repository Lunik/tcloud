import Delogger from 'delogger'

import Config from '../model/config'

var config = new Config({sync: true})
var log = new Delogger('Express', `${__dirname}/${config.log.path}`)

module.exports = (app) => {
  app.use((req, res, next) => {
    let startAt = new Date()
    next()
    let responseTime = new Date() - startAt
    let code = getStatusCode(res)
    let user = getUser(req)
    let ip = getIP(req)
    let method = getMethod(req)
    let url = getUrl(req)
    let status = getStatusCode(res)

    let message = `${user}@${ip} - ${method} ${url} - ${status} ${responseTime}ms`

    if (code < 400) {
      log.info(message)
    } else if (code < 500) {
      log.warning(message)
    } else {
      log.error(message)
    }
  })
}

function getUser (req) {
  return req.user.username || 'Anonymous'
}

function getIP (req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress
}

function getMethod (req) {
  return req.method
}

function getUrl (req) {
  return req.url
}

function getStatusCode (res) {
  return res.statusCode
}
