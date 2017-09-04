import React from 'react'
import List from '@react-mdc/list'

import Color from '../../../color'
import { LockIcon, FileIcon, DownloadIcon } from '../../image/svg'
import FileToolbox from '../../toolbox/file'

export default class FileListItem extends React.Component {
  constructor (props) {
    super(props)

    let ext = this.props.file.type === 'file' ? this.props.file.name.split('.').slice(-1)[0] : 'folder'
    this.state = {
      locked: this.props.file.locked,
      extension: ext,
      fileIcon: FileIcon.getFromExtension(ext)
    }
  }

  render () {
    const lockStyle = Object.assign({}, style.lock, this.state.locked ? style.locked : {})
    const itemStyle = Object.assign({}, style.item, !this.props.color ? style.itemColor : {})

    return (
      <List.Item className="file" type={this.props.file.type} style={itemStyle}>
        <List.Item.StartDetail style={style.startDetail}>
          <this.state.fileIcon />
        </List.Item.StartDetail>
        <span className="name" style={style.name}>{this.props.file.name}</span>
        <span className="size" style={style.size}>{this.props.file.size}</span>
        <span className="download-count" style={style.downloadCount}>
          {this.props.file.downloadCount}
          <DownloadIcon style={style.downloadCountIcon}/>
        </span>
        <span className="locked" style={lockStyle}>
          <LockIcon style={style.lockIcon}/>
        </span>
        <List.Item.EndDetail>
          <FileToolbox file={this.props.file}/>
        </List.Item.EndDetail>
        <div className="children">
          {this.props.children}
        </div>
      </List.Item>
    )
  }
}

FileListItem.defaultProps = {
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

const style = {
  item: {
    height: '30px',
    paddingLeft: '15px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
  },
  itemColor: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottom: 'none'
  },
  startDetail: {
    marginRight: '10px'
  },
  name: {
    flex: '10',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  lock: {
    visibility: 'hidden',
    flex: '1',
    textAlign: 'center'
  },
  locked: {
    visibility: 'visible'
  },
  lockIcon: {
    fill: Color.red
  },
  downloadCount: {
    flex: '1',
    textAlign: 'center'
  },
  downloadCountIcon: {
    marginLeft: '5px',
    fill: Color.lightBlue
  },
  size: {
    flex: '1',
    textAlign: 'center'
  }
}
