/**
 * Created by lunik on 04/07/2017.
 */

import Delogger from 'delogger'
import Crypto from 'crypto-js'
import Rand from 'crypto-rand'
import EventEmitter from 'events'
import Config from './config'
import Datastore from 'nedb'

const config = new Config({sync: true})
const DB = new Datastore({ filename: `${config.database.path}/user.json`, autoload: true, timestampData: true })

export default class User extends EventEmitter {
  constructor (props) {
    super()
    props = props || {}
    this.username = props.username || ''
    this.password = props.password || ''
    this.tokens = props.tokens || []

    this.log = new Delogger(`User(${this.username})`)

    DB.ensureIndex({ fieldName: 'expirationDate', expireAfterSeconds: 0 }, (err) => {
      if (err) this.log.error(err)
    })

    this.on('update', () => this.save())
    this.emit('update')
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
    this.tokens.push(token)
    this.emit('update')
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
}
