import React from 'react'
import classNames from 'classname'

export default class FilesTab extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={classNames('tab', this.props.className)} id={this.props.id}>
        <ul className="mdc-list mdc-list--two-line">

        </ul>
      </div>
    )
  }
}

FilesTab.defaultProps = {
  id: 'files'
}
