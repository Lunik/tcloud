import React from 'react'
import List from '@react-mdc/list'
import $ from 'jquery'

import Color from '../../../color'
import { ArrowIcon, HeartIcon } from '../../image/svg'
import TorrentToolbox from '../../toolbox/torrent'
import RadialProgress from '../../progress/radial'

export default class TorrentListItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {
      mobile: window.innerWidth <= 650
    })
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  componentWillMount () {
    $(window).on('resize', (event) => this.handleWindowResize())
  }

  componentWillUnmount () {
    $(window).off('resize', (event) => this.handleWindowResize())
  }

  handleWindowResize () {
    this.setState({
      mobile: window.innerWidth <= 650
    })
  }

  getSizeItem (bytes) {
    var sizes = ['o', 'ko', 'mo', 'go', 'to']
    if (bytes === 0) { return '0 b' }
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`
  }

  getSpeedItem (bytes) {
    var bits = bytes * 8
    var sizes = ['b', 'kb', 'mb', 'gb', 'tb']
    if (bits === 0) { return '0 b' }
    var i = parseInt(Math.floor(Math.log(bits) / Math.log(1024)), 10)
    return `${Math.round(bits / Math.pow(1024, i), 2)} ${sizes[i]}/s`
  }

  getProgressItem (percent) {
    return Math.floor(percent * 100) + '%'
  }

  render () {
    const itemStyle = Object.assign({}, style.item, !this.props.color ? style.itemColor : {})
    const metadataStyle = Object.assign({}, style.metadata, this.state.mobile ? style.metadataMobile : {})

    return (
      <List.Item className="peer" style={itemStyle}>
        <span className="name" style={style.name}>
          {this.props.peer.metadata.name}
        </span>
        <span className="metadata" style={metadataStyle}>
          <span className="size" style={style.size}>{this.getSizeItem(this.props.peer.metadata.size)}</span>
          <span className="seed" style={style.seed}>
            {this.props.peer.metadata.seed}
            <HeartIcon style={style.seedIcon}/>
          </span>
          <span className="sdown" style={style.sdown}>
            {this.getSpeedItem(this.props.peer.metadata.sdown)}
            <ArrowIcon.Down style={style.sdownIcon}/>
          </span>
          <span className="sup" style={style.sup}>
            {this.getSpeedItem(this.props.peer.metadata.sup)}
            <ArrowIcon.Up style={style.supIcon}/>
          </span>
        </span>
        <span className="progress" style={style.progress}>
          {this.getProgressItem(this.props.peer.metadata.progress)}
          <RadialProgress
            style={style.progressRadial}
            displayText={false}
            value={this.props.peer.metadata.progress} />
        </span>
        <List.Item.EndDetail style={style.endDetail}>
          <TorrentToolbox
            onRemove={ () => this.props.onRemove() }
            peer={this.props.peer}/>
        </List.Item.EndDetail>
      </List.Item>
    )
  }
}

TorrentListItem.defaultProps = {
  color: 1,
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

const style = {
  item: {
    height: '30px',
    paddingLeft: '15px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    minWidth: 'Z00px'
  },
  itemColor: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottom: 'none'
  },
  name: {
    flex: '5',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  metadata: {
    display: 'flex',
    flex: '2'
  },
  metadataMobile: {
    display: 'none'
  },
  seed: {
    flex: '2',
    textAlign: 'right',
    minWidth: '50px',
    marginRight: '10px'
  },
  seedIcon: {
    marginLeft: '5px',
    fill: Color.red,
    verticalAlign: 'top'
  },
  sdown: {
    flex: '2',
    textAlign: 'right',
    minWidth: '100px',
    marginRight: '10px'
  },
  sdownIcon: {
    marginLeft: '5px',
    fill: Color.lightBlue,
    verticalAlign: 'top'
  },
  sup: {
    flex: '2',
    textAlign: 'right',
    minWidth: '100px',
    marginRight: '10px'
  },
  supIcon: {
    marginLeft: '5px',
    fill: Color.red,
    verticalAlign: 'top'
  },
  size: {
    flex: '2',
    textAlign: 'right',
    minWidth: '60px',
    marginRight: '10px'
  },
  progress: {
    flex: '1',
    textAlign: 'right',
    minWidth: '60px'
  },
  progressRadial: {
    marginLeft: '5px',
    verticalAlign: 'top'
  },
  endDetail: {
    marginRight: '10px'
  }
}
