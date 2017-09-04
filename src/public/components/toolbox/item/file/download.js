import React from 'react'
import ListItem from '../default'
import { DownloadIcon } from '../../../image/svg'
import Color from '../../../../color'

export default class DownloadToolboxItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      disabled: this.props.file.download === null
    }
  }

  render () {
    return (
      <ListItem disabled={this.state.disabled} id="download" text="Download" icon={DownloadIcon} />
    )
  }
}

DownloadToolboxItem.defaultProps = {
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