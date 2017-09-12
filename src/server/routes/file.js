/**
 * Created by lunik on 11/07/2017.
 */
import Crypto from 'crypto-js'

import Config from '../model/config'
import Folder, { follow } from '../model/folder'
import File, { parsePath } from '../model/file'
import Delogger from 'delogger'

const config = new Config({sync: true})

var log = new Delogger('File')

module.exports = (app, baseFolder) => {
  app.get('/file/:path((*)/?*)', (req, res) => {
    var path = req.params.path
    var element = follow(path, baseFolder)

    Download(req, res, path)
  })

  app.get('/dl/:file(*)', (req, res) => {

    var encryptedFile = req.params.file
    var path = Crypto.AES.decrypt(encryptedFile, '').toString(Crypto.enc.Utf8)

    Download(req, res, path)
  })

  function Download (req, res, path) {
    var user = req.user
    var element = follow(path, baseFolder)

    if (element) {
      if (element instanceof File) {
        log.info(`${req.user.username} download ${element.name}`)

        element.download(res).then((err) => {
          if (err) {
            res.status(500)
          }
          res.end()
        })
      } else {
        res.status(405)
        res.json({
          err: `You can't download ${path} because it's a folder.`
        })
      }
    } else {
      res.status(404)
      res.json({
        err: `${path} do not exist.`
      })
    }
  }
}
