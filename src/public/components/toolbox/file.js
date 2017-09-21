import React from 'react'
import List from '@react-mdc/list'

import Toolbox from './default'
import * as FileItem from './item/file'

export default class FileToolbox extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Toolbox id="file">
        <FileItem.Download file={this.props.file} />
        <FileItem.Copy file={this.props.file} />
        <FileItem.Rename file={this.props.file}
          onRename={(newName) => this.props.onRename(newName)}/>
        <FileItem.Remove file={this.props.file}
          onRemove={() => this.props.onRemove()}/>
      </Toolbox>
    )
  }
}

FileToolbox.defaultProps = {
  file: {
    name: 'file',
    type: 'file',
    locked: true,
    downloadCount: 0,
    size: 0,
    childs: [],
    url: '/folder',
    download: null
  },
  onRemove: () => {},
  onRename: () => {}
}
