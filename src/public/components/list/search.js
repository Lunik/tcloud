import React from 'react'
import List from '@react-mdc/list'

import SearchListItem from './item/search'

export default class SearchList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {
      title: props.id.charAt(0).toUpperCase() + props.id.slice(1)
    })
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  render () {
    return (
      <div className="List" id={this.props.id}>
        <h3 style={style.title}>{this.state.title}</h3>
        <List id={this.props.id} style={style.list}>
          {this.props.children}
        </List>
      </div>
    )
  }
}

const style = {
  title: {
    fontSize: '30px'
  },
  list: {
    padding: '0'
  }
}
