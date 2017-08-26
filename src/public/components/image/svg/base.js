/**
 * Created by lunik on 06/06/2017.
 */

import React from 'react'
import classNames from 'classname'

export default class SvgIcon extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      onClick: this.props.onClick || function () {},
      svg: null
    }
  }
  componentDidMount () {
    this.setState({
      mounted: true
    })
  }
  set (svg) {
    if (this.state.mounted) {
      this.setState({
        svg: svg
      })
    } else {
      this.state.svg = svg
    }
  }
  render () {
    return (
      <span className={classNames('icon', this.props.className)} style={this.props.style} onClick={(e) => this.state.onClick(e)}>
        {this.state.svg}
      </span>
    )
  }
}
