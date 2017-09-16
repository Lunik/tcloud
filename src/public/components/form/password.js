
import React from 'react'
import $ from 'jquery'

import Notify from '../notification'

import TextInput from '../input/text'
import Form from './default'
import SubmitButton from '../button/submit'

export default class PasswordForm extends React.Component {
  constructor (props) {
    super(props)

    this.minPassLength = 8

    this.state = {
      username: '',
      newpassword: '',
      oldpassword: '',
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

    if (this.state.samePassword) {
      Notify({
        type: 'warning',
        title: 'Can\'t change password',
        content: (
          <p>Both password are equals</p>
        )
      })
    }

    $.ajax({
      url: '/auth/changepass',
      method: 'POST',
      data: this.state,
      success: (response) => {
        Notify({
          type: 'info',
          title: 'Success to change password'
        })

        window.location.hash = '#login'
      }
    }).fail((response) => {
      let text = response.responseJSON.err

      Notify({
        type: 'error',
        title: 'Failed to change password',
        content: (
          <p>{text}</p>
        )
      })
    })
  }
  update () {
    this.setState({
      samePassword: this.state.newpassword === this.state.oldpassword,
      passwordLength: this.state.newpassword.length >= this.minPassLength
    })
  }
  render () {
    return (
      <Form onSubmit={(e) => this.submit(e)} name="password">
        <TextInput name="username" type="text" id="login-username" placeholder="Username"
          value={this.state.username}
          valid={this.state.username.length > 0}
          onChange={ (e) => { this.setState({username: e.target.value}, () => this.update()) }}/>
        <TextInput name="old-password" type="password" id="reset-old-password" placeholder="Old password"
          value={this.state.oldPassword && this.state.oldPassword.length > 0}
          onChange={ (e) => { this.setState({oldpassword: e.target.value}, () => this.update()) }}/>
        <TextInput name="new-password" type="password" id="reset-new--password2" placeholder="New password"
          value={this.state.newPassword}
          valid={this.state.passwordLength && !this.state.samePassword}
          onChange={ (e) => { this.setState({newpassword: e.target.value}, () => this.update()) }}/>
        <SubmitButton name="submit" text="Change"
          disabled={this.state.samePassword || !this.state.passwordLength || this.state.username.length <= 0}/>
      </Form>
    )
  }
}
