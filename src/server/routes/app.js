/**
 * Created by lunik on 11/07/2017.
 */
import Config from '../model/config'
import fs from 'fs'

const config = new Config({sync: true})

const appPackage = JSON.parse(fs.readFileSync('package.json'))
module.exports = (app, baseFolder) => {
  app.get('/app/version', (req, res) => {
    res.end(appPackage.version)
  })
}
