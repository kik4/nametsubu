import React, { Component } from 'react'
import './App.css'
import Canvas from './Canvas'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Canvas />
          <p>test</p>
        </header>
      </div>
    )
  }
}

export default App
