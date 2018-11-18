import Delogger from 'delogger'
import TorrentSearchApi from 'torrent-search-api'
import Path from 'path'

import Config from '../config'
import JackettAPI from './jackett.js'

const config = new Config({sync: true})

export default class TorrentSearch {
  constructor () {

    this.log = new Delogger('Search')

    if (config.torrent.providers.includes('jackett') || config.torrent.providers.includes('Jackett')) {
      this.api = new JackettAPI(config.torrent.jackett)
    } else {
      this.api = new TorrentSearchApi()

      config.torrent.providers.forEach((provider) => this.api.enableProvider(provider))
    }
  }

  search (query) {
    this.log.info(query)
    return new Promise((resolve, reject) => {
      Promise.all([
        this.api.search(query, 'Movies', 20),
        this.api.search(query, 'TV', 20)
      ]).then((res) => {
        var torrents = {
          movie: res[0],
          tv: res[1]
        }

        torrents.movie.forEach((torrent) => {
          torrent.magnet = 'tcloud:' + Buffer.from(JSON.stringify(torrent)).toString('base64')
        })

        torrents.tv.forEach((torrent) => {
          torrent.magnet = 'tcloud:' + Buffer.from(JSON.stringify(torrent)).toString('base64')
        })

        resolve(torrents)
      }).catch(reject)
    })
  }

  getTorrent (torrent) {
    console.log(torrent)
    let parsedTorrent
    if (!torrent.hasOwnProperty('url')) {
      if (torrent.hasOwnProperty('magnet')) {
        parsedTorrent = JSON.parse(Buffer.from(torrent.magnet, 'base64').toString())
      }
    }

    return this.api.getMagnet(parsedTorrent)
  }
}
