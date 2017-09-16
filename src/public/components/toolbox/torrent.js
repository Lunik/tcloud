import React from 'react'

import Toolbox from './default'
import * as TorrentItem from './item/torrent'

export default class TorrentToolbox extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Toolbox id="peer">
        <TorrentItem.Remove peer={this.props.peer}
          onRemove={() => this.props.onRemove()}/>
      </Toolbox>
    )
  }
}

TorrentToolbox.defaultProps = {
  peer: {
    magnet: 'magnet:?',
    metadata: {
      name: 'TheTorrent',
      size: 2048,
      hash: 'thehash',
      sdown: 10000,
      sup: 250,
      down: 402557,
      up: 4028557,
      seed: 17,
      progress: 0.5458,
      timeRemaining: 1404705
    },
    uid: '000',
    url: '/folder'
  },
  onRemove: () => {}
}
