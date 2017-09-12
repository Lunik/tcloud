import React from 'react'
import $ from 'jquery'
import Notify from '../notification'

import List from '@react-mdc/list'
import TorrentListItem from './item/torrent'

export default class TorrentList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      peers: [],
      updateInterval: null
    }

    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {})
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  componentWillMount () {
    this.update()
    this.setState({
      updateInterval: setInterval(() => this.update(), 2000)
    })
  }

  componentWillUnmount () {
    clearInterval(this.state.updateInterval)
    this.setState({
      updateInterval: null
    })
  }

  update () {
    $.ajax({
      method: 'GET',
      url: `/torrent`,
      success: (response) => {
        this.setState({
          peers: response
        })
      }
    }).fail((response) => {
      let text = response.responseJSON.err

      Notify({
        type: 'error',
        title: 'Failed to fetch peers',
        content: (
          <p>{text}</p>
        )
      })
    })
  }

  handleRemove () {
    setTimeout(() => this.update(), 1000)
  }

  render () {
    const peers = this.state.peers.map((peer, key) => <TorrentListItem key={key} color={key % 2} peer={peer} onRemove={() => this.handleRemove()}/>)
    return (
      <List className="list" id="peer">
        {peers}
      </List>
    )
  }
}
