import React from 'react'

export default class DialogRemove extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: this.props.open
    }
  }

  componentWillReceiveProps (props) {
    this.setState({open: props.open})
  }

  render () {
    return null
  }
}