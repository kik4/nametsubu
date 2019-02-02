import React, { Component } from 'react'
import Creator from './Creator'

class App extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">ガキが舐めてると潰すぞメーカー</h1>
          <Creator />
        </div>
      </section>
    )
  }
}

export default App
