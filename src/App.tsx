import React, { Component } from 'react'
import './App.css'
import Creator from './Creator'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>TEST</p>
          <div className="container">
            <Creator />
          </div>
        </header>
      </div>
    )
  }
}

export default App
