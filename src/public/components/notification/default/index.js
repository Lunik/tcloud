/**
 * Created by lunik on 06/06/2017.
 */

import React from 'react'
import classNames from 'classname'
import { InfoIcon, WarningIcon, ErrorIcon } from '../../image/svg'

export default class Notification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: this.parseType(this.props.type),
      timeout: this.props.timeout || this.getDefaultTimeout(this.props.type),
      onRemove: this.props.onRemove || function () {}
    }

    if (this.state.timeout) {
      this.timeout = setTimeout(() => this.remove(), this.state.timeout)
    }
  }
  remove () {
    clearTimeout(this.timeout)

    this.setState({
      mounted: false
    })
    this.state.onRemove()
  }
  getDefaultTimeout (type) {
    switch (type) {
      case 'error':
        return null

      case 'warning':
        return 10000

      case 'info':
      default:
        return 5000
    }
  }
  parseType (type) {
    const types = ['info', 'warning', 'error']
    if (types.indexOf(type) !== -1) {
      return type
    } else {
      return types[0]
    }
  }
  getIcon (type) {
    switch (type) {
      case 'error':
        return (<ErrorIcon style={style.icon}/>)

      case 'warning':
        return (<WarningIcon style={style.icon}/>)

      case 'info':
      default:
        return (<InfoIcon style={style.icon}/>)
    }
  }
  render () {
    return (
      <div style={Object.assign(style.notification, style.type[this.state.type])} className={classNames('notification', this.props.className)}
        type={this.state.type}
        id={this.props.id} onClick={() => this.remove()}>
        {this.getIcon(this.state.type)}
        <h3 style={style.title} className='title'>{this.props.title}</h3>
        <div style={style.content} className='content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const style = {
  notification: {
    padding: '20px',
    margin: '10px auto',
    width: '258px',
    maxWidth: '100%',
    borderRadius: '2px',
    transition: 'all 1s ease'
  },
  title: {
    color: '#FFFFFF',
    margin: '0 auto 10px auto',
    textAlign: 'left'
  },
  content: {
    color: '#FFFFFF'
  },
  icon: {
    fill: '#FFFFFF',
    float: 'left',
    margin: 'auto 5px'
  },
  type: {
    info: {
      backgroundColor: '#27AE60'
    },
    warning: {
      backgroundColor: '#f7a253'
    },
    error: {
      backgroundColor: '#f75353'
    }
  }
}
