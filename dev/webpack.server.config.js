var config = require('../webpack.config')

var WebpackShellPlugin = require('webpack-shell-plugin')

if (process.env.NODE_ENV !== 'production') {
  config[0].plugins.push(new WebpackShellPlugin({onBuildEnd: ['nodemon build/server.js --watch build/server.js']}))
}

module.exports = config