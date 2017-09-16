
import React from 'react'
import $ from 'jquery'

import Notify from '../notification'

import TextInput from '../input/text'
import SubmitButton from '../button/submit'
import Form from './default'

export default class RegisterForm extends React.Component {
  constructor (props) {
    super(props)

    this.minPassLength = 8

    this.state = {
      username: '',
      password: '',
      password2: '',
      passwordLength: false,
      samePassword: true
    }

    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {})
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  submit (e) {
    e.preventDefault()

    if (!this.state.passwordLength) {
      Notify({
        type: 'error',
        title: 'Failed to register',
        content: (
          <p>Password length must be 8 or more</p>
        )
      })
      return
    }

    if (!this.state.samePassword) {
      Notify({
        type: 'error',
        title: 'Failed to register',
        content: (
          <p>Both password are not the same</p>
        )
      })
      return
    }

    $.ajax({
      url: '/auth/register',
      method: 'POST',
      data: this.state,
      success: (response) => {
        Notify({
          type: 'info',
          title: 'Success to register'
        })

        window.location.hash = ''
        window.location.pathname = ''
      }
    }).fail((response) => {
      let text = response.responseJSON.err

      Notify({
        type: 'error',
        title: 'Failed to connect',
        content: (
          <p>{text}</p>
        )
      })
    })
  }
  update () {
    this.setState({
      samePassword: this.state.password === this.state.password2,
      passwordLength: this.state.password.length >= this.minPassLength
    })
  }

  render () {
    return (
      <Form onSubmit={(e) => this.submit(e)} name="register">
        <TextInput name="username" type="text" id="login-username" placeholder="Username"
          value={this.state.username}
          valid={this.state.username.length > 0}
          onChange={(e) => { this.setState({username: e.target.value}, () => this.update()) }}/>
        <TextInput name="password" type="password" id="register-password" placeholder="Password"
          value={this.state.password}
          valid={this.state.passwordLength}
          onChange={(e) => { this.setState({password: e.target.value}, () => this.update()) }}/>
        <TextInput name="password2" type="password" id="register-password2" placeholder="Password again"
          value={this.state.password2}
          valid={this.state.samePassword && this.state.password2.length > 0}
          onChange={(e) => { this.setState({password2: e.target.value}, () => this.update()) }}/>
        <SubmitButton name="submit" text="Register"
          disabled={!this.state.samePassword || !this.state.passwordLength || this.state.username.length <= 0}/>
      </Form>
    )
  }
}
