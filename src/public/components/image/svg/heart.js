/**
 * Created by lunik on 06/06/2017.
 */

import SvgIcon from './base'
import React from 'react'

export default class HeartIcon extends SvgIcon {
  constructor (props) {
    super(props)
    this.props = props
    this.set((
      <svg viewBox='0 0 24 24' width='18px' height='18px'>
        <path d='M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z' />
      </svg>
        ))
  }
}
