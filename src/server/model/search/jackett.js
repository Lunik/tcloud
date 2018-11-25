import Request from 'request-promise'
import { parseString } from 'xml2js'

export default class JackettAPI {
  constructor (options) {
    this.apiKey = options.apiKey
    this.endpoint = options.endpoint
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
  }

  _getUrl (query, category, count) {
    return `${this.endpoint}?apikey=${this.apiKey}&t=search&cat=${category}&q=${query}`
  }

  _getCat (category) {
    switch (category) {
      case 'TV':
        return "5000,5020,5030,5040,5045,5050,5060,5070,5080"
      case 'Movie':
      default:
        return "2000,2010,2020,2030,2040,2045,2050,2060"
    }
  }

  _getSizeItem (bytes) {
    var sizes = ['o', 'ko', 'mo', 'go', 'to']
    if (bytes === 0) { return '0 b' }
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`
  }

  _formatItem (item) {
    return {
      title: item.title[0],
      seeds: item['torznab:attr'].filter((attr) => attr['$'].name === 'seeders')[0]['$'].value,
      peers: item['torznab:attr'].filter((attr) => attr['$'].name === 'peers')[0]['$'].value,
      size: this._getSizeItem(item.size[0]),
      link: item.link[0]
    }
  }

  _parseResult (data) {
    return new Promise((resolve, reject) => {
      data = parseString(data, (err, json) => {
        if (err) {
          return reject(err)
        }

        let torrents = []
        if (json.rss.channel[0].hasOwnProperty('item')) {
          torrents = json.rss.channel[0].item.map((item) => this._formatItem(item))
        }

        resolve(torrents)
      })
    })
  }

  search (query, category, count) {
    return new Promise((resolve, reject) => {
      let url = this._getUrl(query, category, count)

      let options = {
        uri: this.endpoint,
        qs: {
            method: "GET",
            strictSSL: false,
            apikey: this.apiKey,
            t: 'search',
            cat: this._getCat(category),
            q: query
        },
        json: true
      }

      Request(options).then((data) => {
        return this._parseResult(data)
      }).then(resolve).catch(reject)
    })
  }

  getMagnet (torrent) {
    return new Promise((resolve, reject) => {
      resolve(torrent.link)
    })
  }
}