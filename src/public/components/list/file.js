import React from 'react'
import $ from 'jquery'
import List from '@react-mdc/list'

import Notify from '../notification'

import Loading from '../loading'
import FileListItem from './item/file'
import Tree from '../tree'

export default class FileList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      files: [],
      loading: false,
      location: window.location.hash.substring(1),
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
    this.setState({
      updateInterval: setInterval(() => this.update(), 30000)
    })
  }

  componentWillUnmount () {
    $(window).off('hashchange', () => this.handleHashCHange())
    clearInterval(this.state.updateInterval)
    this.setState({
      updateInterval: null
    })
  }

  handleHashCHange () {
    this.changeDir(window.location.hash.substring(1))
  }
  update () {
    $.ajax({
      method: 'GET',
      url: `/folder/${this.state.location}`,
      success: (response) => {
        this.setState({
          files: response.childs,
          loading: false
        })
      }
    }).fail((response) => {
      let text = response.responseJSON.err

      this.setState({
        loading: false
      })

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
    this.setState({
      location: dir,
      loading: true
    })
    this.update()
  }

  render () {
    const files = this.state.files.map((file, key) => <FileListItem key={key} color={key % 2} file={file} onRemove={() => this.update()}/>)
    return (
      <List className="list" id="file">
        <Loading hidden={!this.state.loading}/>
        <Tree path={this.state.location} />
        {files}
      </List>
    )
  }
}
