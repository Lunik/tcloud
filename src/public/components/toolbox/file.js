import React from 'react'
import List from '@react-mdc/list'
import Toolbox from './default'

import * as FileItem from './item/file'
import { ThreeDotsIcon } from '../image/svg'
import Color from '../../color'

export default class FileToolbox extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Toolbox id="file">
        <FileItem.Download file={this.props.file} />
        <FileItem.Rename file={this.props.file} />
        <FileItem.Remove file={this.props.file} />
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
  }
}
