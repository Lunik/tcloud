
import React from 'react'
import $ from 'jquery'

import Notify from '../notification'
import Loading from '../loading'

import TextInput from '../input/text'
import SubmitButton from '../button/submit'
import CheckboxInput from '../checkbox/default'
import Form from './default'

export default class LoginForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      staylogged: false
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
    Loading.start()

    $.ajax({
      url: '/auth/login',
      method: 'POST',
      data: this.state,
      success: (response) => {
        Loading.done()

        Notify({
          type: 'info',
          title: 'Success to connect'
        })

        window.location.hash = ''
        window.location.pathname = ''
      }
    }).fail((response) => {
      let text = response.responseJSON.err

      Loading.done()

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
        <CheckboxInput
          onChange={(e) => { this.setState({staylogged: e.target.checked}) }}/>
        <SubmitButton name="submit" text="Login"
          disabled={this.state.password.length <= 0 || this.state.username.length <= 0}/>
      </Form>
    )
  }
}
