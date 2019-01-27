import * as React from 'react'
import './Creator.css'

export default class Creator extends React.Component<{}, { text: string }> {
  constructor(props: any) {
    super(props)
    this.state = {
      text: 'ガキが・・・\n舐めてると\n潰すぞ',
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    const { canvas } = this as any
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, 640, 360)

    ctx.fillStyle = 'gray'
    ctx.fillRect(0, 0, 640, 360)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 290, 360)

    ctx.font = "normal 42px 'Noto Serif JP'"
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    let x = 220
    let yi = 0
    this.state.text.split('').forEach((c: string, index: number) => {
      if (c == '\n') {
        x -= 220 / 3
        yi = 0
        return
      }
      ctx.fillText(c, x, 56 + yi * 48)
      yi++
    })
  }

  onChange(e: any) {
    this.setState({ text: e.target.value })
    this.updateCanvas()
  }

  render() {
    return (
      <div>
        <canvas
          ref={e => {
            ;(this as any).canvas = e
          }}
          width="640"
          height="360"
        />
        <textarea name="text" id="text" cols={30} rows={5} value={this.state.text} onChange={this.onChange} />
      </div>
    )
  }
}
