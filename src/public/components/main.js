import React from 'react'

import Bar from './bar'
import List from './list'

export default class Main extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div style={style.div} className="viewer">
        <div className="bars">
          <Bar />
          <List />
        </div>
      </div>
    )
  }
}

const style = {
  div: {}
}
