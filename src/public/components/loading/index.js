import React from 'react'
import Spinner from 'react-spinkit'
import Color from '../../color'

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
          <Spinner style={spinnerStyle} name="double-bounce" color={Color.orange}/>
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
  left: '50%',
  top: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
  width: '80px',
  height: '80px'
}
