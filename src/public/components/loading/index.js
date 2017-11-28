import React from 'react'
import { DoubleBounce } from 'better-react-spinkit'

import Color from '../../style/theme'

export default class Loading extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.hidden) {
      return null
    } else {
      return (
        <div style={style} className="Loading">
          <DoubleBounce style={spinnerStyle} size={100} color={Color.orange}/>
        </div>
      )
    }
  }
}

const style = {
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backgroundColor: Color.transparentGrey,
  position: 'fixed',
  zIndex: 10000,
  visibility: 'visible'
}

const spinnerStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
  width: '100px',
  height: '100px'
}
