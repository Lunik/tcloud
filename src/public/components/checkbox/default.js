import React from 'react'
import Checkbox from '@react-mdc/checkbox'

import Color from '../../style/theme'

export default class CheckboxInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      checked: false
    }

    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {})
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  onChange (e) {
    this.setState({checked: e.target.checked})
    this.props.onChange(e)
  }

  render () {
    return (
      <div style={Object.assign(style.div, this.props.style.div)}>
        <Checkbox style={Object.assign(style.checkbox, this.props.style.checkbox)}>
          <Checkbox.NativeControl checked={this.state.checked} onChange={ (e) => this.onChange(e)} />
          <Checkbox.Background style={Object.assign(this.state.checked ? {} : style.background, this.props.style.background)}>
            <Checkbox.Checkmark />
            <Checkbox.Mixedmark />
          </Checkbox.Background>
        </Checkbox>
        <label style={Object.assign(style.label, this.props.style.label)}>Stay logged</label>
      </div>
    )
  }
}

CheckboxInput.defaultProps = {
  style: {
    div: {},
    label: {},
    checkbox: {},
    background: {}
  },
  onChange: () => {}
}

const style = {
  div: {
    display: 'flex',
    margin: '10px auto',
    width: '200px'
  },
  checkbox: {
    marginLeft: '-10px'
  },
  label: {
    margin: '10px 0',
    color: Color.lightGrey
  },
  background: {
    borderColor: Color.lightGrey
  }
}
