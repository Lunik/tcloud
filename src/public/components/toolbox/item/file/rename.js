import React from 'react'
import ListItem from '../default'
import { PencilIcon } from '../../../image/svg'
import Color from '../../../../color'

export default class RenameToolboxItem extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <ListItem id="rename" text="Rename" icon={PencilIcon}/>
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
  }
}