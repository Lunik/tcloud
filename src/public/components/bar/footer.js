import React from 'react'
import $ from 'jquery'

import Color from '../../color'

export default class MaClass extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      version: '0.0.0'
    }
  }

  componentWillMount () {
    $.ajax({
      method: 'GET',
      url: '/app/version',
      success: (version) => {
        this.setState({
          version: version
        })
      }
    }).fail((response) => {
      let text = response.responseJSON.err
      console.error(text)
    })
  }
  render () {
    return (
      <div className="footer" style={style.div}>
        <p style={style.version}>Version {this.state.version}</p>
        <p style={style.feedback}>
          <a target="_blank" href="https://github.com/Lunik/tcloud/issues">FeedBack</a>
        </p>
        <p style={style.author}>Powered by<span> </span>
          <a target="_blank" href="https://github.com/Lunik">@Lunik</a>
        </p>
      </div>
    )
  }
}

const style = {
  div: {
    display: 'flex',
    marginTop: '20px'
  },
  version: {
    flex: '1',
    textAlign: 'center',
    color: Color.grey
  },
  feedback: {
    flex: '1',
    textAlign: 'center',
    color: Color.grey
  },
  author: {
    flex: '1',
    textAlign: 'center',
    color: Color.grey
  }
}
