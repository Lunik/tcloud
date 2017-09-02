import React from 'react'
import classNames from 'classname'

import Color from '../../color'
import Textfield from '@react-mdc/textfield'

export default class TextInput extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Textfield
        style={Object.assign(style.div, this.props.style.div)}
        className={classNames('input', this.props.className, this.props.valid ? '' : 'invalid')} >
        <Textfield.Input
          value={this.props.value}
          style={Object.assign(style.input, this.props.style.input)}
          type={this.props.type} id={this.props.id}
          onChange={ (e) => this.props.onChange(e) }
        />
        <Textfield.Label htmlFor={this.props.id}>
          {this.props.placeholder}
        </Textfield.Label>
      </Textfield>
    )
  }
}

TextInput.defaultProps = {
  type: 'text',
  className: '',
  id: '',
  placeholder: '',
  onChange: () => {},
  valid: true,
  style: {
    div: {},
    input: {}
  }
}

const style = {
  div: {
    display: 'flex',
    width: '200px',
    margin: '10px auto'
  },
  input: {
    width: '100%'
  }
}
