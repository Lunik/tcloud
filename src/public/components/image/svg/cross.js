/**
 * Created by lunik on 06/06/2017.
 */

import SvgIcon from './base'
import React from 'react'

export default class CrossIcon extends SvgIcon {
  constructor (props) {
    super(props)
    this.props = props
    this.set((
      <svg viewBox='0 0 612 792' width='20px' height='20px'>
        <g>
          <polygon points='382.2,396.4 560.8,217.8 484,141 305.4,319.6 126.8,141 50,217.8 228.6,396.4 50,575 126.8,651.8    305.4,473.2 484,651.8 560.8,575 382.2,396.4  ' />
        </g>
      </svg>
        ))
  }
}
