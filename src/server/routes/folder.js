/**
 * Created by lunik on 10/07/2017.
 */

import Config from '../model/config'
import Folder, { follow } from '../model/folder'
import File, { parsePath } from '../model/file'

const config = new Config({sync: true})

var baseFolder = new Folder(`/${__dirname}/${config.files.path}`, '')

if (!baseFolder.exist) {
  baseFolder.create()
}

module.exports = (app) => {
  app.get('/folder', (req, res) => {
    res.json(baseFolder)
  })

  app.get('/folder/:path((\\w*)/?*)', (req, res) => {
    var path = req.params.path
    var element = follow(path, baseFolder)

    if (element) {
      res.json(element)
    } else {
      res.status(404)
      res.json({
        err: `${path} do not exist.`
      })
    }
  })

  app.put('/folder/:path((\\w*)/?*)', (req, res) => {
    var path = req.params.path
    var type = req.body.type || 'folder'

    var parsedPath = parsePath(path)

    var element = follow(parsedPath.path, baseFolder)

    if (element) {
      if (element instanceof Folder) {
        if (!element.findChild(parsedPath.fileName)) {
          var newElement
          switch (req.body.type) {
            case 'file':
              newElement = new File(`${baseFolder.fullPath()}/${parsedPath.path}/${parsedPath.fileName}`, parsedPath.path)
              break
            case 'folder':
            default:
              newElement = new Folder(`${baseFolder.fullPath()}/${parsedPath.path}/${parsedPath.fileName}`, parsedPath.path)
              break
          }
          newElement.create()
          element.addChild(newElement)

          res.json(newElement)
        } else {
          res.status(403)
          res.json({
            err: `You can't create ${path} because it already exist.`
          })
        }
      } else {
        res.status(400)
        res.json({
          err: `You can't create ${path}, ${parsedPath.path} is not a folder.`
        })
      }
    } else {
      res.status(404)
      res.json({
        err: `You can't create ${path}, ${parsedPath.path} do not exist.`
      })
    }
  })

  app.delete('/folder/:path((\\w*)/?*)', (req, res) => {
    var path = req.params.path

    var element = follow(path, baseFolder)

    if (element) {
      res.json(element)
      element.remove()
    } else {
      res.status(404)
      res.json({
        err: `${path} do not exist.`
      })
    }
  })

  return baseFolder
}
