import React from 'react'
import Path from 'path'
import $ from 'jquery'

import Notify from '../../../notification'
import Color from '../../../../style/theme'

import TextInput from '../../../input/text'
import ListItem from '../default'
import { PencilIcon } from '../../../image/svg'
import DialogWindow from '../../../dialog/default'
import Loading from '../../../loading'

export default class RenameToolboxItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dialogOpen: false
    }
    this.initState(props)
  }

  initState (props) {
    let name = props.file.name.split('.')
    let ext = props.file.type === 'file'
      ? name.length > 1
        ? name.pop()
        : ''
      : null

    Object.assign(this.state, {
      disabled: props.file.locked,
      filename: name.join('.'),
      extension: ext
    })
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  handleClick () {
    this.setState({dialogOpen: true})
  }

  handleAccept () {
    this.setState({
      dialogOpen: false
    })

    Loading.start()

    let newName = this.state.extension ? [this.state.filename, this.state.extension].join('.') : this.state.filename
    $.ajax({
      method: 'POST',
      url: Path.join(this.props.file.url, 'rename'),
      data: {
        new: newName
      },
      success: (response) => {
        Loading.done()

        this.props.onRename(newName)

        Notify({
          type: 'info',
          title: `The ${this.props.file.type} have been renamed`
        })
      }
    }).fail((response) => {
      let text = response.responseJSON.err

      Loading.done()

      Notify({
        type: 'error',
        title: `Failed to rename ${this.props.file.type}`,
        content: (
          <p>{text}</p>
        )
      })
    })
  }

  handleClose () {
    this.setState({
      dialogOpen: false
    })
  }

  handleChangeName (e) {
    this.setState({
      filename: e.target.value.replace(/[^\w\s._-]/gi, '-')
    })
  }

  handleChangeExtension (e) {
    this.setState({
      extension: e.target.value.replace(/[^\w\s._-]/gi, '-')
    })
  }

  render () {
    return (
      <ListItem
        disabled={this.state.disabled}
        id="rename" text="Rename"
        icon={PencilIcon}
        onClick={() => this.handleClick()}>
        <DialogWindow
          open={this.state.dialogOpen}
          title={`Renaming ${this.props.file.name}`}
          onAccept={() => this.handleAccept()}
          onClose={() => this.handleClose()}
          footer={true}>
          <span style={style.inputContainer}>
            <TextInput
              style={{div: style.input}}
              placeholder="Name"
              value={this.state.filename}
              onChange={(e) => this.handleChangeName(e)}/>
            {
              this.state.extension !== null &&
              <TextInput
                style={{div: style.input}}
                placeholder="Extension"
                value={this.state.extension}
                onChange={(e) => this.handleChangeExtension(e)}/>
            }
          </span>
        </DialogWindow>
      </ListItem>
    )
  }
}

RenameToolboxItem.defaultProps = {
  file: {
    name: 'file',
    type: 'file',
    locked: true,
    downloadCount: 0,
    size: 0,
    childs: [],
    url: '/folder',
    download: null
  },
  onRename: () => {}
}

const style = {
  inputContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  input: {
    margin: '0 5px'
  }
}
