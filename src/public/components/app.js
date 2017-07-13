/**
 * Created by lunik on 04/07/2017.
 */

import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Main from './main'
import Login from './login'

export default class App extends React.Component {
  constructor (props) {
    super(props)

  }
  render () {
    return (
      <Router>
        <div>
          <Route path="/index.html" component={Main}/>
          <Route path="/login.html" component={Login}/>
        </div>
      </Router>
    )
  }
}
