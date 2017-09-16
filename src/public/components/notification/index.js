import React from 'react'
import ReactDOM from 'react-dom'

import Notification from './default'

export default function notify (options) {
  options.title = options.title || 'Title'
  options.content = options.content
  options.timeout = options.timeout

  var notification = document.createElement('div')

  document.getElementById('notificationContainer').appendChild(notification)
  ReactDOM.render(
    <Notification title={options.title}
      type={options.type}
      timeout={options.timeout}
      onRemove={() => {
        try {
          document.getElementById('notificationContainer').removeChild(notification)
        } catch (e) {

        }
      }}>
      {options.content}
    </Notification>,
    notification)
}
