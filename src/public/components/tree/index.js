import React from 'react'
import $ from 'jquery'

import Branch from './branch'

export default class Tree extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mobile: false
    }
  }

  componentWillMount () {
    $(window).on('resize', (event) => this.handleWindowResize())
  }

  componentWillUnmount () {
    $(window).off('resize', (event) => this.handleWindowResize())
  }

  handleWindowResize () {
    this.setState({
      mobile: window.innerWidth <= 580
    })
  }

  render () {
    let branches = this.props.path.split('/')

    let currentPath = ''
    var JSXBranches = branches.map((branch, key) => {
      currentPath += branch + '/'
      return (
        <Branch id={branch} key={key} url={`#${currentPath.slice(0, -1)}`} text={branch}/>
      )
    })
    return (
      !this.state.mobile &&
      <div className="tree">
        <Branch id='files' url="#" text="files"/>
        {JSXBranches}
      </div>
    )
  }
}

Tree.defaultProps = {
  path: ''
}
