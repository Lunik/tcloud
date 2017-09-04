import React from 'react'
import ListItem from '../default'
import { CrossIcon } from '../../../image/svg'
import Color from '../../../../color'

export default class RemoveToolboxItem extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <ListItem id="remove" text="Remove" icon={CrossIcon} />
    )
  }
}

RemoveToolboxItem.defaultProps = {
  file: {
    name: 'file',
    type: 'file',
    locked: true,
    downloadCount: 0,
    size: 0,
    childs: [],
    url: '/folder',
    download: null
  }
}