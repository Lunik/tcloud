import React from 'react'
import Dialog from '@react-mdc/dialog'

import Color from '../../color'

export default class DialogWindow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: this.props.open
    }
  }
  componentWillReceiveProps (props) {
    this.setState({open: props.open})
  }
  close () {
    this.setState({
      open: false
    })
    this.props.onClose()
  }
  open () {
    this.setState({
      open: true
    })
    this.props.onOpen()
  }
  render () {
    return (
      <Dialog
        open={this.state.open}
        onClose={() => this.close()}
        onOpen={() => this.open()}>
        <Dialog.Surface style={style.surface}>
          <Dialog.Header>
            <Dialog.Header.Title>
                {this.props.title}
            </Dialog.Header.Title>
          </Dialog.Header>
          <Dialog.Body>
            {this.props.children}
          </Dialog.Body>
        </Dialog.Surface>
        <Dialog.Backdrop style={style.backdrop}/>
      </Dialog>
    )
  }
}

DialogWindow.defaultProps = {
  open: false,
  onOpen: () => {},
  onClose: () => {}
}

const style = {
  surface: {
    backgroundColor: Color.grey,
    maxHeight: '90vh',
    overflow: 'scroll'
  },
  backdrop: {
    opacity: '.7'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold'
  }
}
