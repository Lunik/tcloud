import React from 'react'
import $ from 'jquery'
import List from '@react-mdc/list'

import Color from '../../../style/theme'

import { ArrowIcon } from '../../image/svg'

export default class SearchListItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      hover: false
    }
    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {
      mobile: window.innerWidth <= 500
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
      mobile: window.innerWidth <= 500
    })
  }

  onClick () {
    this.props.onClick(this.props.torrent)
  }

  getSeedNum (seed) {
    if (seed >= 100) {
      return '99+'
    }

    return seed
  }

  render () {
    const infoStyle = Object.assign({}, this.props.style, this.state.mobile ? style.infosMobile : {})

    return (
      <List.Item style={Object.assign({}, style.div, this.state.hover ? style.divHover : {})}
        onClick={() => this.onClick()}
        onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}>
        <span
          style={style.name}
          className="name"
          title={this.props.torrent.title}>
          {this.props.torrent.title}
        </span>
        <span className="infos" style={infoStyle}>
          <span style={style.infos} className="infos">
            <span className="info" id="size"
              style={style.info.size}>{this.props.torrent.size}</span>
            <span className="info" id="seeds"
              style={style.info.seeds}>
              <ArrowIcon.Up style={style.arrow.up}/>{this.getSeedNum(this.props.torrent.seeds)}
            </span>
            <span className="info" id="peers"
              style={style.info.peers}>
              <ArrowIcon.Down style={style.arrow.down}/>{this.getSeedNum(this.props.torrent.peers)}
            </span>
          </span>
        </span>
      </List.Item>
    )
  }
}

SearchListItem.defaultProps = {
  torrent: {
    title: 'torrent',
    size: '0ko',
    seeds: '0',
    leechs: '0'
  },
  onClick: () => {}
}

const style = {
  div: {
    display: 'flex',
    justifyContent: 'space-around',
    cursor: 'pointer',
    marginLeft: '-20px',
    paddingLeft: '20px',
    height: '30px'
  },
  divHover: {
    backgroundColor: Color.orange
  },
  name: {
    flex: '3',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  infos: {
    display: 'flex',
    justifyContent: 'space-around',
    flex: '1'
  },
  infosMobile: {
    display: 'none'
  },
  info: {
    size: {
      flex: '4',
      textAlign: 'right',
      minWidth: '80px'
    },
    seeds: {
      flex: '3',
      minWidth: '60px'
    },
    peers: {
      flex: '3',
      minWidth: '60px'
    }
  },
  arrow: {
    up: {
      fill: Color.red,
      margin: 'auto 5px'
    },
    down: {
      fill: Color.lightBlue,
      margin: 'auto 5px'
    }
  }
}
