import React from 'react'
import ListItem from '../default'
import { PencilIcon } from '../../../image/svg'
import Color from '../../../../color'

export default class RenameToolboxItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {
      disabled: props.file.locked
    })
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  handleClick () {

  }

  render () {
    return (
      <ListItem
        disabled={this.state.disabled}
        id="rename" text="Rename"
        icon={PencilIcon}
        onClick={() => this.handleClick()}/>
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
