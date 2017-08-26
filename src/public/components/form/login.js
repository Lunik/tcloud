
import React from 'react'
import $ from 'jquery'
import Notify from '../notification'

import TextInput from '../input/text'
import SubmitButton from '../button/submit'
import Form from '../form'

export default class LoginForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }
  submit (e) {
    e.preventDefault()

    $.ajax({
      url: '/auth/login',
      method: 'POST',
      data: this.state,
      success: (response) => {
        Notify({
          type: 'info',
          title: 'Sucess to connect'
        })

        window.location.pathname = ''
        window.location.hash = ''
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

  render () {
    return (
      <Form onSubmit={(e) => this.submit(e)} className="login">
        <TextInput name="username" type="text" id="login-username" placeholder="Username"
          value={this.state.username}
          valid={this.state.username.length > 0}
          onChange={(e) => { this.setState({username: e.target.value}) }}/>
        <TextInput name="password" type="password" id="login-password" placeholder="Password"
          value={this.state.password}
          valid={this.state.password.length > 0}
          onChange={(e) => { this.setState({password: e.target.value }) }}/>
        <SubmitButton name="submit" text="Login"
          disabled={this.state.password.length <= 0 || this.state.username.length <= 0}/>
      </Form>
    )
  }
}
