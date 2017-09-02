import React from 'react'
import classNames from 'classname'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <form style={this.props.style} onSubmit={ (e) => this.props.onSubmit(e) } className={classNames('form', this.props.className)}>
        {this.props.children}
      </form>
    )
  }
}

Form.defaultProps = {
  type: 'text',
  className: '',
  id: '',
  onSubmit: (e) => { e.preventDefault() }
}
