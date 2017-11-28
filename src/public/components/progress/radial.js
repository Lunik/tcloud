import React from 'react'

import Color from '../../style/theme'

function clamp (n, min, max) {
  return Math.max(min, Math.min(max, n))
}

export default class MyRadialProgress extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.initState(props)
  }

  initState (props) {
    Object.assign(this.state, {
      value: props.value < 1 ? props.value * 100 : props.value
    })
  }

  componentWillReceiveProps (props) {
    this.initState(props)
  }

  generatePath (degrees) {
    const radius = this.props.radius
    const radians = (degrees * Math.PI / 180)
    var x = Math.sin(radians) * radius
    var y = Math.cos(radians) * -radius
    const halfEdgeSize = this.props.edgeSize / 2
    x += halfEdgeSize
    y += halfEdgeSize
    const largeArcSweepFlag = degrees > 180 ? 1 : 0
    const startX = halfEdgeSize
    const startY = halfEdgeSize - radius
    return `M${startX},${startY} A${radius},${radius} 1 ${largeArcSweepFlag} 1 ${x},${y} `
  }

  render () {
    const center = this.props.edgeSize / 2
    const radius = this.props.radius
    let degrees
    let text = ''

    let percent = clamp(this.state.value, 0, 100)
    degrees = percent / 100 * 360
    degrees = clamp(degrees, 0, 359.9)
    text = this.props.formatText(percent)

    const pathDescription = this.generatePath(degrees)

    return (
      <svg height={this.props.edgeSize} width={this.props.edgeSize} style={this.props.style}>
        <circle cx={center} cy={center} r={radius}
          stroke={this.props.circleStroke}
          strokeWidth={this.props.circleStrokeWidth}
          fill={this.props.circleFill}/>
        <path d={pathDescription}
          fill="transparent"
          stroke={this.props.progressStroke}
          strokeWidth={this.props.circleStrokeWidth + 1}/>
        { this.props.displayText && <text x={center} y={center} textAnchor="middle">{text}</text> }
      </svg>
    )
  }
}

MyRadialProgress.defaultProps = {
  value: 0.42,
  edgeSize: 20,
  radius: 5,
  circleStrokeWidth: 10,
  circleStroke: Color.grey,
  circleFill: Color.grey,
  progressStroke: Color.green,
  displayText: true,
  formatText: (value) => value
}
