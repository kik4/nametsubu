import React, { useState, useMemo, useCallback } from 'react'

const culcHeight = (width: number): number => {
  return (width * 9) / 16
}

const drawRect = (param: {
  ctx: any
  x: number
  y: number
  width: number
  height: number
  radius: number
  color: any
}) => {
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

const isIOS = /[ \(]iP/.test(navigator.userAgent)
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') != -1

export default () => {
  const canvasWidth = 1280
  const canvasHeight = useMemo(() => culcHeight(canvasWidth), [canvasWidth])
  const canvas = useMemo(() => {
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    return canvas
  }, [canvasWidth, canvasHeight])
  const ctx = useMemo(() => canvas.getContext('2d')!, [canvas])

  const [text, setText] = useState('ガキが・・・\n舐めてると\n潰すぞ')
  const [time, setTime] = useState('00:03:43')
  const [isTimeVisible, setIsTimeVisible] = useState(true)
  const [image, setImage] = useState(undefined as HTMLImageElement | undefined)

  const file_onChange = useCallback((e: any) => {
    const image = new Image()
    const file = e.target.files[0]
    if (!file) {
      setImage(undefined)
      return
    }
    image.src = window.URL.createObjectURL(file)
    image.onload = () => {
      setImage(image)
    }
  }, [])

  const dl_onClick = useCallback((e: any) => {
    const data = canvas.toDataURL()
    const dlLink = document.createElement('a')
    dlLink.href = data
    dlLink.download = 'gakitsubu.png'
    dlLink.click()
  }, [])

  const imageareaWidth = canvasHeight
  const textareaWidth = canvasWidth - imageareaWidth
  const lines = text.split('\n')
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

  if (image) {
    let width = 0,
      height = 0
    if (image.width > image.height) {
      height = imageareaWidth
      width = (image.width * height) / image.height
    } else {
      width = imageareaWidth
      height = (image.height * width) / image.width
    }
    ctx.drawImage(image, (textareaWidth + canvasWidth) / 2 - width / 2, 0, width, height)
  }

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, textareaWidth, canvasHeight)

  ctx.font = `normal ${fontSize}px "ヒラギノ明朝 ProN W6", "HiraMinProN-W6", "HG明朝E", "ＭＳ Ｐ明朝", "MS PMincho", "MS 明朝", serif`
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  let x = lineX
  let yi = 0
  text.split('').forEach((c: string, index: number) => {
    if (c == '\n') {
      x -= lineHeight
      yi = 0
      return
    }
    ctx.fillText(c, x, lineY + yi * charHeight, lineHeight)
    yi++
  })

  if (isTimeVisible) {
    let text = ''
    const match = time.match(/0?0?:?0?(.*)/)
    if (match) {
      text = match[1]
    }

    const right = (1230 * canvasWidth) / 1280
    const width = ((40 * text.length + 64) * canvasWidth) / 1280
    const y = (538 * canvasWidth) / 1280
    const height = (134 * canvasWidth) / 1280
    const radius = (18 * canvasWidth) / 1280
    const margin = isFirefox ? (6 * canvasWidth) / 1280 : 0

    drawRect({ ctx, x: right - width, y, width, height, radius, color: 'rgba(0, 0, 0, 0.8)' })

    const fontSize = (80 * canvasWidth) / 1280
    ctx.font = `normal ${fontSize}px sans-serif`
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if (!text) {
      text = time
    }
    ctx.fillText(text, right - width / 2, y + height / 2 + margin)
  }

  return (
    <div>
      <img src={canvas.toDataURL()} alt="" className="canvas-img" />
      <div className="forms is-vertical">
        <textarea
          className="textarea"
          name="text"
          id="text"
          rows={5}
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="file">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="resume"
              accept="image/jpeg,image/png"
              onChange={file_onChange}
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
            <input type="checkbox" checked={isTimeVisible} onChange={() => setIsTimeVisible(!isTimeVisible)} />
            動画の長さを表示
          </label>
        </div>
        {isTimeVisible && (
          <input
            className="input"
            type="text"
            step="1"
            value={time}
            onChange={e => setTime(e.target.value)}
            placeholder="00:03:43"
          />
        )}
        {!isIOS && !isFirefox && (
          <button className="button" onClick={dl_onClick}>
            画像をダウンロード
          </button>
        )}
        <div>画像長押しでDLできます</div>
      </div>
    </div>
  )
}
