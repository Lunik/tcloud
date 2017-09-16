import React from 'react'
import List from '@react-mdc/list'

import Color from '../../../color'

import { LockIcon, FileIcon, DownloadIcon } from '../../image/svg'
import FileToolbox from '../../toolbox/file'

export default class FileListItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.initState(props)
  }

  initState (props) {
    let ext = props.file.type === 'file' ? props.file.name.split('.').slice(-1)[0] : 'folder'
    Object.assign(this.state, {
      locked: props.file.locked,
      extension: ext,
      fileIcon: FileIcon.getFromExtension(ext)
    })
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  componentWillReceiveProps (props) {
    let ext = props.file.type === 'file' ? props.file.name.split('.').slice(-1)[0] : 'folder'

    this.setState({
      extension: ext,
      fileIcon: FileIcon.getFromExtension(ext)
    })
  }

  getNameItem () {
    if (this.props.file.type === 'file') {
      return this.props.file.name
    } else {
      return (<a href={`#${this.props.file.path}`}>
        {this.props.file.name}
      </a>)
    }
  }

  getSizeItem (bytes) {
    var sizes = ['o', 'ko', 'mo', 'go', 'to']
    if (bytes === 0) { return '0 b' }
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`
  }

  render () {
    const lockStyle = Object.assign({}, style.lock, this.state.locked ? style.locked : {})
    const itemStyle = Object.assign({}, style.item, !this.props.color ? style.itemColor : {})
    const downloadCountStyle = Object.assign({}, style.downloadCount, this.props.file.type === 'folder' ? style.downloadCountHidden : {})

    return (
      <List.Item className="file" type={this.props.file.type} style={itemStyle}>
        <List.Item.StartDetail style={style.startDetail}>
          <this.state.fileIcon />
        </List.Item.StartDetail>
        <span className="name" style={style.name}>
          {this.getNameItem()}
        </span>
        <span className="size" style={style.size}>{this.getSizeItem(this.props.file.size)}</span>
        <span className="download-count" style={downloadCountStyle}>
          {this.props.file.downloadCount}
          <DownloadIcon style={style.downloadCountIcon}/>
        </span>
        <span className="locked" style={lockStyle}>
          <LockIcon style={style.lockIcon}/>
        </span>
        <List.Item.EndDetail style={style.endDetail}>
          <FileToolbox
            onRemove={ () => this.props.onRemove() }
            onRename={(newName) => { this.props.file.name = newName }}
            file={this.props.file}/>
        </List.Item.EndDetail>
      </List.Item>
    )
  }
}

FileListItem.defaultProps = {
  color: 1,
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
  onRemove: () => {}
}

const style = {
  item: {
    height: '30px',
    paddingLeft: '15px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    minWidth: '300px'
  },
  itemColor: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottom: 'none'
  },
  startDetail: {
    marginRight: '10px'
  },
  name: {
    flex: '5',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
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
    textAlign: 'right',
    minWidth: '50px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  downloadCountHidden: {
    visibility: 'hidden'
  },
  downloadCountIcon: {
    marginLeft: '5px',
    fill: Color.lightBlue,
    verticalAlign: 'top'
  },
  size: {
    flex: '1',
    textAlign: 'right',
    minWidth: '70px'
  },
  endDetail: {
    marginRight: '10px'
  }
}
