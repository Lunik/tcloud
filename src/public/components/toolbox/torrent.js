import React from 'react'
import { ThreeDotsIcon } from '../image/svg'

export default class TorrentToolbox extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="toolbox" id="torrent">
        <ThreeDotsIcon/>
      </div>
    )
  }
}

const style = {

}