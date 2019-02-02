import * as React from 'react'
import './Creator.css'

export default class Creator extends React.Component<
  {},
  { text: string; image: HTMLImageElement | undefined; width: number; height: number }
> {
  constructor(props: any) {
    super(props)
    this.state = {
      text: 'ガキが・・・\n舐めてると\n潰すぞ',
      image: undefined,
      width: 1280,
      height: this.culcHeight(1280),
    }
    this.text_onChange = this.text_onChange.bind(this)
    this.file_onChange = this.file_onChange.bind(this)
    this.dl_onClick = this.dl_onClick.bind(this)
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

  dl_onClick(e: any) {
    const { canvas } = this as any
    const data = canvas.toDataURL()
    var dlLink = document.createElement('a')
    dlLink.href = data
    dlLink.download = 'gakitsubu.png'
    dlLink.click()
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
            className="textarea is-medium"
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
          <button className="button" onClick={this.dl_onClick}>
            画像をダウンロード
          </button>
        </div>
      </div>
    )
  }
}
