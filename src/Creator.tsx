import * as React from 'react'

export default class Creator extends React.Component<
  {},
  {
    text: string
    image: HTMLImageElement | undefined
    width: number
    height: number
    isTimeVisible: boolean
    time: string
  }
> {
  constructor(props: any) {
    super(props)
    this.state = {
      text: 'ガキが・・・\n舐めてると\n潰すぞ',
      image: undefined,
      width: 1280,
      height: this.culcHeight(1280),
      isTimeVisible: true,
      time: '00:03:43',
    }
    this.text_onChange = this.text_onChange.bind(this)
    this.file_onChange = this.file_onChange.bind(this)
    this.dl_onClick = this.dl_onClick.bind(this)
    this.isTimeVisible_onChange = this.isTimeVisible_onChange.bind(this)
    this.time_onChange = this.time_onChange.bind(this)
  }

  culcHeight(width: number): number {
    return (width * 9) / 16
  }

  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  drawRect(param: { ctx: any; x: number; y: number; width: number; height: number; radius: number; color: any }) {
    const ctx = param.ctx
    const x = param.x
    const y = param.y
    const width = param.width
    const height = param.height
    const radius = param.radius || 0
    const color = param.color

    ctx.save()
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, 0, false)
    ctx.lineTo(x + width, y + height - radius)
    ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5, false)
    ctx.lineTo(x + radius, y + height)
    ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI, false)
    ctx.lineTo(x, y + radius)
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5, false)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  updateCanvas() {
    const { canvas } = this as any
    const ctx = canvas.getContext('2d')

    const canvasWidth = this.state.width
    const canvasHeight = this.state.height
    const imageareaWidth = canvasHeight
    const textareaWidth = canvasWidth - imageareaWidth
    const lines = this.state.text.split('\n')
    const lineCount = lines.length + 1
    const lineMaxLength = Math.max(...lines.map(line => line.length))
    const lineHeight = textareaWidth / lineCount
    const magnifier = canvasWidth / 640
    const charHeight = ((48 * 6) / lineMaxLength) * magnifier
    const fontSize = ((42 * 6) / lineMaxLength) * magnifier
    const lineX = textareaWidth - lineHeight
    const lineY = ((26 * 6) / lineMaxLength + 30) * magnifier

    ctx.fillStyle = 'gray'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    if (this.state.image) {
      let width = 0,
        height = 0
      if (this.state.image.width > this.state.image.height) {
        height = imageareaWidth
        width = (this.state.image.width * height) / this.state.image.height
      } else {
        width = imageareaWidth
        height = (this.state.image.height * width) / this.state.image.width
      }
      ctx.drawImage(this.state.image, (textareaWidth + canvasWidth) / 2 - width / 2, 0, width, height)
    }

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, textareaWidth, canvasHeight)

    ctx.font = `normal ${fontSize}px serif`
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    let x = lineX
    let yi = 0
    this.state.text.split('').forEach((c: string, index: number) => {
      if (c == '\n') {
        x -= lineHeight
        yi = 0
        return
      }
      ctx.fillText(c, x, lineY + yi * charHeight, lineHeight)
      yi++
    })

    if (this.state.isTimeVisible) {
      let text = ''
      const match = this.state.time.match(/0?0?:?0?(.*)/)
      if (match) {
        text = match[1]
      }

      const right = (1230 * canvasWidth) / 1280
      const width = ((40 * text.length + 64) * canvasWidth) / 1280
      const y = (538 * canvasWidth) / 1280
      const height = (134 * canvasWidth) / 1280
      const radius = (18 * canvasWidth) / 1280
      this.drawRect({ ctx, x: right - width, y, width, height, radius, color: 'rgba(0, 0, 0, 0.8)' })

      const fontSize = (76 * canvasWidth) / 1280
      ctx.font = `normal ${fontSize}px gothic`
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      if (!text) {
        text = this.state.time
      }
      ctx.fillText(text, right - width / 2, y + height / 2)
    }
  }

  text_onChange(e: any) {
    this.setState({ text: e.target.value })
  }

  file_onChange(e: any) {
    const image = new Image()
    const file = e.target.files[0]
    if (!file) {
      this.setState({ image: undefined })
      return
    }
    image.src = window.URL.createObjectURL(file)
    image.onload = () => {
      this.setState({ image })
    }
  }

  private isIOS = /[ \(]iP/.test(navigator.userAgent)

  dl_onClick(e: any) {
    const { canvas } = this as any
    const data = canvas.toDataURL()
    const dlLink = document.createElement('a')
    dlLink.href = data
    dlLink.download = 'gakitsubu.png'
    dlLink.click()
  }

  isTimeVisible_onChange(e: any) {
    this.setState({ isTimeVisible: !this.state.isTimeVisible })
  }

  time_onChange(e: any) {
    this.setState({ time: e.target.value })
  }

  render() {
    return (
      <div>
        <canvas
          ref={e => {
            ;(this as any).canvas = e
          }}
          width={this.state.width}
          height={this.state.height}
        />
        <div className="forms is-vertical">
          <textarea
            className="textarea"
            name="text"
            id="text"
            rows={5}
            value={this.state.text}
            onChange={this.text_onChange}
          />
          <div className="file">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="resume"
                accept="image/jpeg,image/png"
                onChange={this.file_onChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload" />
                </span>
                <span className="file-label">画像を開く…</span>
              </span>
            </label>
          </div>
          <div>
            <label className="checkbox">
              <input type="checkbox" checked={this.state.isTimeVisible} onChange={this.isTimeVisible_onChange} />
              動画の長さを表示
            </label>
          </div>
          {this.state.isTimeVisible && (
            <input className="input" type="time" step="1" value={this.state.time} onChange={this.time_onChange} />
          )}
          {!this.isIOS && (
            <button className="button" onClick={this.dl_onClick}>
              画像をダウンロード
            </button>
          )}
        </div>
      </div>
    )
  }
}
