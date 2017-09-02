import React from 'react'
import classNames from 'classname'

export default class TorrentsTab extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={classNames('tab', this.props.className)} id={this.props.id}>
        <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list two-line-avatar-text-icon-demo">
          <li className="mdc-list-item">
            <span className="mdc-list-item__start-detail grey-bg" role="presentation">
              <i className="material-icons" aria-hidden="true">folder</i>
            </span>
            <span className="mdc-list-item__text">
                  Photos
              <span className="mdc-list-item__text__secondary">Jan 9, 2014</span>
            </span>
            <a href="#" className="mdc-list-item__end-detail material-icons" aria-label="View more information" title="More info" onclick="event.preventDefault();">
              info
            </a>
          </li>
          <li className="mdc-list-item">
            <span className="mdc-list-item__start-detail grey-bg" role="presentation">
              <i className="material-icons" aria-hidden="true">folder</i>
            </span>
            <span className="mdc-list-item__text">
                  Recipes
              <span className="mdc-list-item__text__secondary">Jan 17, 2014</span>
            </span>
            <a href="#" className="mdc-list-item__end-detail material-icons" aria-label="View more information" title="More info" onclick="event.preventDefault();">
              info
            </a>
          </li>
          <li className="mdc-list-item">
            <span className="mdc-list-item__start-detail grey-bg" role="presentation">
              <i className="material-icons" aria-hidden="true">folder</i>
            </span>
            <span className="mdc-list-item__text">
                  Work
              <span className="mdc-list-item__text__secondary">Jan 28, 2014</span>
            </span>
            <a href="#" className="mdc-list-item__end-detail material-icons" aria-label="View more information" title="More info" onclick="event.preventDefault();">
              info
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

TorrentsTab.defaultProps = {
  id: 'torrents'
}
