import React from 'react'

import TorrentList from './torrent'
import FileList from './file'

export default class List extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="lists" id={this.props.id}>
        <TorrentList />
        <FileList />
      </div>
    )
  }
}
