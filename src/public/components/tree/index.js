import React from 'react'

import Branch from './branch'

export default class Tree extends React.Component {
  constructor (props) {
    super(props)
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