import React from 'react'
import $ from 'jquery'
import Path from 'path'

import Branch from './branch'

export default class Tree extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {
      mobile: window.innerWidth <= 620
    })
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  componentWillMount () {
    $(window).on('resize', (event) => this.handleWindowResize())
  }

  componentWillUnmount () {
    $(window).off('resize', (event) => this.handleWindowResize())
  }

  handleWindowResize () {
    this.setState({
      mobile: window.innerWidth <= 620
    })
  }

  render () {
    let branches = this.props.path.split('/')

    let currentPath = ''
    var JSXBranches = branches.map((branch, key) => {
      currentPath = Path.join(currentPath, branch)
      return (
        <Branch id={branch} key={key} url={`#${currentPath}`} text={branch}/>
      )
    })
    return (
      !this.state.mobile &&
      <div className="tree" style={style.div}>
        <Branch id='files' url="#" text="files"/>
        {JSXBranches}
      </div>
    )
  }
}

Tree.defaultProps = {
  path: ''
}

const style = {
  div: {
    display: 'inline-block'
  }
}
