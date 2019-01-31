import React, { Component } from 'react'
import './App.css'
import Creator from './Creator'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <p>TEST</p>
        </header>
        <div className="container">
          <Creator />
        </div>
      </div>
    )
  }
}

export default App
