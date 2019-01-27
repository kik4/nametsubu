import * as React from 'react'
import './Creator.css'

export default class Creator extends React.Component<{}, { text: string; image: HTMLImageElement | undefined }> {
  constructor(props: any) {
    super(props)
    this.state = {
      text: 'ガキが・・・\n舐めてると\n潰すぞ',
      image: undefined,
    }
    this.text_onChange = this.text_onChange.bind(this)
    this.file_onChange = this.file_onChange.bind(this)
    this.dl_onClick = this.dl_onClick.bind(this)
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

    if (this.state.image) {
      const height = 360
      const width = (this.state.image.width * height) / this.state.image.height
      ctx.drawImage(this.state.image, (290 + 640) / 2 - width / 2, 0, width, height)
    }

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
          width="640"
          height="360"
        />
        <textarea name="text" id="text" cols={30} rows={5} value={this.state.text} onChange={this.text_onChange} />
        <input id="file" name="file" type="file" accept="image/jpeg,image/png" onChange={this.file_onChange} />
        <button onClick={this.dl_onClick}>画像をダウンロード</button>
      </div>
    )
  }
}
