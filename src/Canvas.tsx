import React, { Component } from 'react'
import './Canvas.css'

export default class Canvas extends Component {
  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    const { canvas } = this as any
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, 1280, 720)
  }

  render() {
    return (
      <canvas
        ref={e => {
          ;(this as any).canvas = e
        }}
        width="1280"
        height="720"
      />
    )
  }
}
