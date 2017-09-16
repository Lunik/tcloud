import React from 'react'
import classNames from 'classname'
import Button from '@react-mdc/button'

export default class SubmitButton extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Button accent={this.props.accent}
        raised={this.props.raised}
        disabled={this.props.disabled}
        style={Object.assign(style.button, this.props.style)}
        className={classNames('input', this.props.className)} >
        {this.props.text}
      </Button>
    )
  }
}

SubmitButton.defaultProps = {
  type: 'submit',
  className: '',
  id: '',
  text: 'submit',
  onClick: (e) => { e.preventDefault() },
  accent: true,
  raised: true,
  disabled: false
}

const style = {
  button: {
    margin: '10px auto'
  }
}
