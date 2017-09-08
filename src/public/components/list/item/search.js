import React from 'react'
import $ from 'jquery'
import List from '@react-mdc/list'
import { ArrowIcon } from '../../image/svg'

import Color from '../../../color'

export default class SearchListItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      hover: false,
      mobile: false
    }
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
          title={this.props.torrent.name}>
          {this.props.torrent.name}
        </span>
        <span className="infos" style={infoStyle}>
          <span style={style.infos} className="infos">
            <span className="info" id="size"
              style={style.info.size}>{this.props.torrent.size}</span>
            <span className="info" id="seeds"
              style={style.info.seeds}>
              <ArrowIcon.Up style={style.arrow.up}/>{this.props.torrent.seeds}
            </span>
            <span className="info" id="leechs"
              style={style.info.leechs}>
              <ArrowIcon.Down style={style.arrow.down}/>{this.props.torrent.leechs}
            </span>
          </span>
        </span>
      </List.Item>
    )
  }
}

SearchListItem.defaultProps = {
  torrent: {
    name: 'torrent',
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
    leechs: {
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
