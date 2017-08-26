/**
 * Created by lunik on 06/06/2017.
 */

import SvgIcon from './base'
import React from 'react'

export default class TickIcon extends SvgIcon {
  constructor (props) {
    super(props)
    this.props = props
    this.set((
      <svg viewBox='0 0 512 512' width='18px' height='18px'>
        <g>
          <polygon points='434.8,49 174.2,309.7 76.8,212.3 0,289.2 174.1,463.3 196.6,440.9 196.6,440.9 511.7,125.8 434.8,49' />
        </g>
      </svg>
    ))
  }
}
