import Delogger from 'delogger'
import Crypto from 'crypto-js'
import Rand from 'crypto-rand'
import EventEmitter from 'events'
import Datastore from 'nedb'

import Config from './config'

const config = new Config({sync: true})
const DB = new Datastore({ filename: `${config.database.path}/user.json`, autoload: true, timestampData: true })

export default class User extends EventEmitter {
  constructor (props) {
    super()
    props = props || {}
    this.username = props.username || ''
    this.password = Crypto.SHA256(props.password || '')
    this.tokens = props.tokens || []

    this.log = new Delogger(`User(${this.username})`)

    DB.ensureIndex({ fieldName: 'expirationDate', expireAfterSeconds: 0 }, (err) => {
      if (err) this.log.error(err)
    })

    this.on('update', () => this.save())

    DB.findOne({
      username: this.username
    }, (err, data) => {
      if (err) this.log.error(err)
      if (data) {
        Object.assign(this, data)
      }
      this.emit('ready')
    })
  }

  exist (cb) {
    DB.findOne({
      username: this.username
    }, (err, data) => {
      if (err) this.log.error(err)
      cb(data !== null)
    })
  }

  save () {
    const newUser = {
      username: this.username,
      password: this.password,
      tokens: this.tokens
    }

    DB.update({
      username: this.username
    }, newUser, {}, (err, numAffected) => {
      if (err) this.log.error(err)
      if (numAffected === 0) {
        DB.insert(newUser, (err) => { if (err) this.log.error(err) })
      }
    })
  }

  generateToken (expire) {
    let seed = `${Rand.rand().toString()}`
    const token = {
      id: Crypto.SHA256(seed).toString(),
      expirationDate: new Date(Date.now() + expire)
    }
    return token
  }

  set (props) {
    for (let p in props) {
      this[p] = props[p]
    }

    this.emit('update')
  }

  login (ip, stayLogged) {
    let expire = stayLogged ? 31536000000 : 86400000 // OneYear / OneDay
    var token = this.generateToken(expire)

    this.tokens.push(token)
    this.emit('update')

    this.log.info(`${this.username} login from ${ip}`)
    return token
  }

  logout (tokenId) {
    for (let i = 0; i < this.tokens.length; i++) {
      let token = this.tokens[i]
      if (token.id === tokenId) {
        delete this.tokens[i]
        this.emit('update')
        break
      }
    }

    this.log.info(`${this.username} logout`)
  }

  isTokenValid (tokenId) {
    for (let i = 0; i < this.tokens.length; i++) {
      let token = this.tokens[i]
      if (token.id === tokenId) {
        return true
      }
    }
    return false
  }

  isPasswordValid (password) {
    return Crypto.SHA256(password).toString() === this.password
  }
}
