/**
 * Created by lunik on 04/07/2017.
 */

import React from 'react'

import NotificationContainer from './notification/container'
import Main from './main'
import Login from './login'

export default class App extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    var Route
    switch (window.location.pathname) {
      default:
      case '/index.html':
        Route = null//(<Main />)
        break
      case '/login.html':
        Route = (<Login />)
        break
    }

    return (
      <div className="app">
        {Route}
        <NotificationContainer position='topRight'></NotificationContainer>
      </div>
    )
  }
}
