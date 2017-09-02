/**
 * Created by lunik on 13/07/2017.
 */

import React from 'react'

import Logo from './image/logo'
import LoginForm from './form/login'
import RegisterForm from './form/register'
import PasswordForm from './form/password'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    window.addEventListener('hashchange', () => this.forceUpdate(), false)
  }

  componentWillUnmount () {
    window.removeEventListener('hashchange', () => this.forceUpdate(), false)
  }

  render () {
    const routes = ['#login', '#register', '#password']
    var Route
    switch (window.location.hash) {
      default:
      case routes[0]:
        Route = (<LoginForm />)
        break
      case routes[1]:
        Route = (<RegisterForm />)
        break
      case routes[2]:
        Route = (<PasswordForm />)
        break
    }

    var links = []
    for (let route of routes) {
      if (route !== window.location.hash) {
        links.push(<a style={style.links} key={route} href={route}>{route.slice(1)[0].toUpperCase() + route.slice(2)}</a>)
      }
    }
    if (window.location.hash === '') {
      links = links.slice(1)
    }

    return (
      <div style={style.div} className="Login">
        <Logo style={style.logo} />
        <h1>Login to Tcloud</h1>
        {Route}
        <div className="links">
          {links}
        </div>
      </div>
    )
  }
}

const style = {
  div: {
    margin: 'auto',
    textAlign: 'center'
  },
  links: {
    margin: 'auto 5px'
  },
  logo: {
    width: '20%',
    minWidth: '150px',
    margin: '30px'
  }
}