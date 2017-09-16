import React from 'react'
import classNames from 'classname'

export default class NotificationContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {
      position: this.parsePostion(props.position)
    })
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  parsePostion (position) {
    const positions = ['topRight', 'topLeft', 'bottomLeft', 'bottomRight']
    if (positions.indexOf(position) !== -1) {
      return position
    } else {
      return positions[0]
    }
  }
  render () {
    return (
      <div style={Object.assign(style.container, style.position[this.state.position])}
        className={classNames('notificationContainer', this.state.position, this.props.className)}
        id='notificationContainer'>
        {this.props.children}
      </div>
    )
  }
}

const style = {
  container: {
    position: 'fixed',

    maxWidth: '100%',
    zIndex: '9998'
  },
  position: {
    topLeft: {
      top: '5px',
      left: '15px'
    },
    bottomLeft: {
      bottom: '5px',
      left: '15px'
    },
    topRight: {
      top: '5px',
      right: '15px'
    },
    bottomRight: {
      bottom: '5px',
      right: '15px'
    }
  }
}
