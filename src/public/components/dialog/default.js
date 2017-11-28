import React from 'react'
import Dialog from '@react-mdc/dialog'

import Color from '../../style/theme'

export default class DialogWindow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {
      open: props.open
    })
  }

  componentWillReceiveProps (props) {
    this.initState(props)
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

  accept () {
    this.close()
    this.props.onAccept()
  }

  cancel () {
    this.close()
    this.props.onCancel()
  }

  render () {
    const footerStyle = Object.assign({}, style.footer, this.props.footer ? {} : style.footerDisabled)

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
          <Dialog.Body style={style.body}>
            {this.props.children}
          </Dialog.Body>
          <Dialog.Footer style={footerStyle}>
            <Dialog.Footer.Button
              type="cancel"
              style={style.cancelButton}
              onClick={(e) => this.cancel()}>
              {this.props.footerText.cancel}
            </Dialog.Footer.Button>
            <Dialog.Footer.Button
              type="accept"
              style={style.acceptButton}
              onClick={(e) => this.accept()}>
              {this.props.footerText.accept}
            </Dialog.Footer.Button>
          </Dialog.Footer>
        </Dialog.Surface>
        <Dialog.Backdrop style={style.backdrop}/>
      </Dialog>
    )
  }
}

DialogWindow.defaultProps = {
  open: false,
  onOpen: () => {},
  onClose: () => {},
  onAccept: () => {},
  onCancel: () => {},
  footer: false,
  footerText: {
    cancel: 'Cancel',
    accept: 'Accept'
  }
}

const style = {
  footer: {

  },
  footerDisabled: {
    display: 'none'
  },
  surface: {
    backgroundColor: Color.darkGrey,
    maxHeight: '90vh',
    maxWidth: '100%',
    overflow: 'auto',
    borderRadius: '2px'
  },
  body: {
    wordWrap: 'break-word'
  },
  backdrop: {
    opacity: '.6'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  acceptButton: {
    backgroundColor: Color.green,
    color: Color.white
  },
  cancelButton: {
    backgroundColor: Color.red,
    color: Color.white
  }
}
