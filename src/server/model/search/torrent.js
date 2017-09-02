import T411Api from 't411api'

export default class TorrentSearch {
  constructor () {
    this.api = new T411Api()
  }

  search (query) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.api.search(query, {
          category: 1 // Movie
        }),
        this.api.search(query, {
          category: 2 // TV
        })]
      ).then((res) => {
        var torrents = {
          movie: res[0],
          tv: res[1]
        }

        torrents.movie.forEach((torrent) => {
          torrent.magnet = 'tcloud:' + Buffer.from(torrent.url).toString('base64')
        })

        torrents.tv.forEach((torrent) => {
          torrent.magnet = 'tcloud:' + Buffer.from(torrent.url).toString('base64')
        })

        resolve(torrents)
      }).catch(reject)
    })
  }

  getTorrent (torrent) {
    if (!torrent.hasOwnProperty('url')) {
      if (torrent.hasOwnProperty('magnet')) {
        torrent.url = Buffer.from(torrent.magnet, 'base64').toString()
      }
    }
    return this.api.getMagnet(torrent)
  }
}
