import Delogger from 'delogger'

import { follow } from '../model/folder'
import File from '../model/file'

var log = new Delogger('File')

module.exports = (app, baseFolder) => {
  app.get('/file/:path((*)/?*)', (req, res) => {
    var path = req.params.path

    Download(req, res, path)
  })

  app.get('/dl/:file(*)', (req, res) => {
    var base64File = req.params.file
    var path = Buffer.from(base64File, 'base64').toString()

    Download(req, res, path)
  })

  function Download (req, res, path) {
    var user = req.user
    var element = follow(path, baseFolder)

    if (element) {
      if (element instanceof File) {
        log.info(`${user.username} download ${element.name}`)

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
