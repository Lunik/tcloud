import React from 'react'

export default class Logo extends React.Component {
  constructor (props) {
    super(props)
  }

  handleClick () {
    window.location.hash = ''
    window.location.pathname = '/'
  }

  render () {
    return (<img src='logo.png'
      onClick={() => this.handleClick()}
      style={this.props.style}
      alt="logo"
      srcSet="src/image/logo/512x512.png 512w,
         src/image/logo/128x128.png 128w,
         src/image/logo/96x96.png 96w,
         src/image/logo/72x72.png 72w,
         src/image/logo/64x64.png 64w,
         src/image/logo/48x48.png 48w,
         src/image/logo/32x32.png 32w,
         src/image/logo/24x24.png 24w,
         src/image/logo/16x16.png 16w" />)
  }
}
