/**
 * Created by lunik on 04/07/2017.
 */
import fs from 'fs'
import Delogger from 'delogger'
import EventEmitter from 'events'
import { expect } from 'chai'

export const ConfigLocation = `config.json`

export default class Config extends EventEmitter {
  constructor (props) {
    super()
    props = props || {}
    this.location = ConfigLocation
    this.log = new Delogger('Config')

    if (props.sync) {
      try {
        var data = fs.readFileSync(this.location)
        this.parseConfig(data)
      } catch (err) {
        if (err.code === 'ENOENT') {
          this.generateConfig()
        } else {
          this.log.error(err)
        }
      }
    } else {
      fs.readFile(this.location, (err, data) => {
        if (err && err.code === 'ENOENT') {
          this.generateConfig()
        } else if (!err) {
          this.parseConfig(data)
        } else {
          this.log.error(err)
        }
      })
    }
  }
  generateConfig () {
    let config = {
      'log': {
        'path': 'logs/'
      },
      'server': {
        'port': 5000,
        'masterKey': 'mymasterkey',
        'https': false,
        'hostname': '',
        'certs': {
          'privatekey': '',
          'certificate': '',
          'chain': ''
        }
      },
      'database': {
        'path': 'database/'
      },
      'authentification': false,
      'files': {
        'path': 'files/'
      }
    }

    Object.assign(this, config)

    fs.writeFile(this.location, JSON.stringify(config, undefined, 2), (err) => {
      if (err) {
        this.log.error(err)
      }
    })

    this.emit('ready')
  }

  parseConfig (string) {
    let config = JSON.parse(string)

    expect(config).to.have.property('log').to.be.a('object')
    expect(config.log).to.have.property('path').to.be.a('string')

    expect(config).to.have.property('server')
    expect(config.server).to.have.property('port').to.be.a('number').within(0, 65535)
    expect(config.server).to.have.property('masterKey').to.be.a('string').to.have.lengthOf.above(5)
    expect(config.server).to.have.property('https').to.be.a('boolean')
    if (config.server.https) {
      expect(config.server).to.have.property('hostname').to.be.a('string')

      expect(config.server).to.have.property('certs').to.be.a('object')
      expect(config.server.certs).to.have.property('privatekey').to.be.a('string')
      expect(config.server.certs).to.have.property('certificate').to.be.a('string')
      expect(config.server.certs).to.have.property('chain').to.be.a('string')
    }

    expect(config).to.have.property('database').to.be.a('object')
    expect(config.database).to.have.property('path').to.be.a('string')

    expect(config).to.have.property('authentification').to.be.a('boolean')

    expect(config).to.have.property('files').to.be.a('object')
    expect(config.files).to.have.property('path').to.be.a('string')

    Object.assign(this, config)

    this.emit('ready')
  }
}
