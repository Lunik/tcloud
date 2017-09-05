import React from 'react'
import $ from 'jquery'
import Notify from '../notification'

import List from '@react-mdc/list'
import FileListItem from './item/file'
import Tree from '../tree'

export default class FileList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      files: [],
      location: window.location.hash.substring(1),
      updateInterval: null
    }
  }

  componentWillMount () {
    window.onhashchange = () => this.changeDir(window.location.hash.substring(1))
    this.update()
    this.setState({
      updateInterval: setInterval(() => this.update(), 30000)
    })
  }

  componentWillUnmount () {
    window.onhashchange = () => {}
    clearInterval(this.state.updateInterval)
    this.setState({
      updateInterval: null
    })
  }

  update () {
    $.ajax({
      method: 'GET',
      url: `/folder/${this.state.location}`,
      success: (response) => {
        this.setState({
          files: response.childs
        })
      }
    }).fail((response) => {
      let text = response.responseJSON.err

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
      location: dir
    })
    this.update()
  }

  render () {
    const files = this.state.files.map((file, key) => <FileListItem key={key} color={key % 2} file={file} onRemove={() => this.update()}/>)
    return (
      <List className="list" id="file">
        <Tree path={this.state.location} />
        {files}
      </List>
    )
  }
}
