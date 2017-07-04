/**
 * Created by lunik on 04/07/2017.
 */
const webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BUILD_DIR = __dirname + '/build'
module.exports = [
  {
    entry: './src/server/index.js',
    output: {
      path: BUILD_DIR,
      filename: 'server.js'
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }]
    },
    target: 'node',
    externals: [nodeExternals()],
    plugins: [
      new UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      })
    ]
  },
  {
    entry: './src/public/index.js',
    output: {
      path: BUILD_DIR,
      filename: 'app.js'
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }]
    },
    plugins: [
      new UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      })
    ]
  }
]
