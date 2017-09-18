import Path from 'path'
import Delogger from 'delogger'

const log = new Delogger('https')

var defaults = {
  trustProtoHeader: false,
  trustAzureHeader: false,
  trustXForwardedHostHeader: false,
  port: 443
}

function applyOptions (options) {
  var settings = {}
  options = options || {}

  for (var option in defaults) {
    settings[option] = options[option] || defaults[option]
  }
  return settings
}

export default function (options) {
  options = applyOptions(options)

  return (req, res, next) => {
    let isSecure = req.secure

    if (!isSecure && options.trustProtoHeader) {
      isSecure = ((req.headers['x-forwarded-proto'] || '').substring(0, 5) === 'https')
    }

    if (!isSecure && options.trustAzureHeader && req.headers['x-arr-ssl']) {
      isSecure = true
    }

    if (isSecure) {
      next()
    } else {
      if (req.method === 'GET' || req.method === 'HEAD') {
        var host = options.trustXForwardedHostHeader ? (req.headers['x-forwarded-host'] || req.headers.host) : req.headers.host

        try {
          if (options.port === 443) {
            res.redirect(301, 'https://' + Path.join(host, req.originalUrl))
          } else {
            res.redirect(301, 'https://' + Path.join(host.replace(/:[0-9]*/g, '') + ':' + options.port, req.originalUrl))
          }
        } catch (err) {
          log.error(err)
          var cache = []
          log.error(JSON.stringify(req, function (key, value) {
            if (typeof value === 'object' && value !== null) {
              if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return
              }
              // Store value in our collection
              cache.push(value)
            }
            return value
          }))
          cache = null
          next()
        }
      } else {
        res.status(403).send('Please use HTTPS when submitting data to this server.')
      }
    }
  }
}
