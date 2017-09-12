/**
 * Created by lunik on 12/07/2017.
 */
import Config from '../model/config'
import Folder, { follow } from '../model/folder'
import File, { parsePath } from '../model/file'
import Torrent from '../model/torrent'
import TorrentSearch from '../model/search/torrent'

const config = new Config({sync: true})
const searchEngine = new TorrentSearch()

module.exports = (app, baseFolder) => {
  var torrent = new Torrent({
    baseFolder: baseFolder
  })

  app.get('/torrent', (req, res) => {
    res.json(Object.keys(torrent.peers).map((key) => torrent.peers[key]))
  })

  app.post('/search/torrent', (req, res) => {
    var query = req.body.query

    if (query) {
      searchEngine.search(query).then((torrents) => {
        res.json(torrents)
      }).catch(() => {})
    } else {
      res.status(400)
      res.json({
        err: 'Missing query.'
      })
    }
  })

  app.put('/torrent', (req, res) => {
    var magnet = req.body.magnet

    const specialMagnet = /tcloud:.*/

    if (specialMagnet.test(magnet)) {
      magnet = magnet.replace(/tcloud:/, '')
      searchEngine.getTorrent({ magnet }).then(() => {
        var peer = torrent.download('/tmp/' + magnet.slice(0, 20))
        res.json(peer)
      }).catch((err) => { console.log(err) })
    } else if (magnet) {
      var peer = torrent.download(magnet)
      res.json(peer)
    } else {
      res.status(400)
      res.json({
        err: 'Missing magnet.'
      })
    }
  })

  app.get('/peer', (req, res) => {
    res.json(torrent.peers)
  })

  app.get('/peer/:uid(*)', (req, res) => {
    var uid = req.params.uid

    if (torrent.peers[uid]) {
      res.json(torrent.peers[uid])
    } else {
      res.status(404)
      res.json({
        err: `Peer ${uid} do not exist.`
      })
    }
  })

  app.delete('/peer/:uid(*)', (req, res) => {
    var uid = req.params.uid

    if (torrent.peers[uid]) {
      torrent.peers[uid].stop()
      res.json(torrent.peers[uid])
    } else {
      res.status(404)
      res.json({
        err: `Peer ${uid} do not exist.`
      })
    }
  })
}
