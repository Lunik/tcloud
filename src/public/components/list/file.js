import React from 'react'
import $ from 'jquery'
import List from '@react-mdc/list'
import io from 'socket.io-client'

import Notify from '../notification'
import Loading from '../loading'

import FileListItem from './item/file'
import Tree from '../tree'

export default class FileList extends React.Component {
  constructor (props) {
    super(props)

    this.storageID = '__files'

    let fromCache = this.loadCache() || {}
    this.state = {
      files: fromCache.childs || [],
      size: fromCache.size || 0,
      updateInterval: null
    }

    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {
      location: window.location.hash.substring(1)
    })
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  componentWillMount () {
    $(window).on('hashchange', () => this.handleHashCHange())
    this.update()
    this.socket = io.connect(window.location.origin, {transports: ['websocket'], secure: window.location.protocol === 'https:'})
    this.socket.on('folder', (folder) => this.updateSocket(folder))
    this.state.updateInterval = setInterval(() => this.update(), 30000)
  }

  componentWillUnmount () {
    $(window).off('hashchange', () => this.handleHashCHange())
    this.socket.close()
    clearInterval(this.state.updateInterval)
  }

  handleHashCHange () {
    this.changeDir(window.location.hash.substring(1))
  }

  updateSocket (folder) {
    if (folder.path !== window.location.hash.substring(1)) {
      return null
    }

    try {
      this.setState({
        files: folder.childs,
        size: folder.size
      })
    } catch (e) {
      this.state.files = folder.childs
      this.state.size = folder.size
    }

    this.saveCache(folder)
  }

  update () {
    Loading.start()

    $.ajax({
      method: 'GET',
      url: `/folder/${this.state.location}`,
      success: (response) => {
        Loading.done()

        this.setState({
          files: response.childs,
          size: response.size
        })

        this.saveCache(response)
      }
    }).fail((response) => {
      let text = response.responseJSON.err

      Loading.done()

      Notify({
        type: 'error',
        title: 'Failed to fetch files',
        content: (
          <p>{text}</p>
        )
      })
    })
  }

  changeDir (dir) {
    let fromCache = this.loadCache() || {}

    Loading.start()

    this.setState({
      location: dir,
      files: fromCache.childs || [],
      size: fromCache.size || 0
    })
    this.update()
  }

  getSizeItem (bytes) {
    var sizes = ['o', 'ko', 'mo', 'go', 'to']
    if (bytes === 0) { return '0 b' }
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`
  }

  saveCache (folder) {
    let hash = window.location.hash.substring(1)
    let base64Hash = btoa(hash)
    window.localStorage.setItem(`${this.storageID}_${base64Hash}`, JSON.stringify(folder))
  }

  loadCache () {
    let hash = window.location.hash.substring(1)
    let base64Hash = btoa(hash)
    return JSON.parse(window.localStorage.getItem(`${this.storageID}_${base64Hash}`))
  }

  render () {
    const files = this.state.files.map((file, key) => <FileListItem
      key={key}
      color={key % 2}
      file={file}
      onRemove={() => this.update()}
      onRename={() => this.update()}/>)
    return (
      <List className="list" id="file">
        {this.getSizeItem(this.state.size)}
        <Tree path={this.state.location} />
        {files}
      </List>
    )
  }
}
