import React from 'react'

import NotificationContainer from './notification/container'
import Main from './main'
import Login from './login'
import Footer from './bar/footer'

export default class App extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    var Route
    switch (window.location.pathname) {
      default:
      case '/index.html':
        Route = (<Main />)
        break
      case '/login.html':
        Route = (<Login />)
        break
    }

    return (
      <div style={style.app} className="app">
        {Route}
        <Footer />
        <NotificationContainer position='topRight'></NotificationContainer>
      </div>
    )
  }
}

const style = {
  app: {
    minWidth: '200px'
  }
}
