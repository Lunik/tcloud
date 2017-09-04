import React from 'react'

export default class Branch extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="branch" id={this.props.id} style={style.branch}>
        <span className="arrow" style={style.arrow}>/</span>
        <a href={this.props.url} >{this.props.text}</a>
      </div>
    )
  }
}

Branch.defaultProps = {
  id: '',
  key: '0',
  url: '',
  text: 'branch'
}

const style = {
  branch: {
    display: 'inline-block'
  },
  arrow: {
    margin: '0 5px'
  }
}
