import fs from 'fs'

const appPackage = JSON.parse(fs.readFileSync('package.json'))
module.exports = (app, baseFolder) => {
  app.get('/app/version', (req, res) => {
    res.end(appPackage.version)
  })
}
