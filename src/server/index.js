import Server from './routes/main'
import Config from './model/config'

var config = new Config({})

config.on('ready', () => {
  var server = new Server()

  server.listen()
})
