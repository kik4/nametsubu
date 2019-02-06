import React, { Component } from 'react'
import Creator from './Creator'

export default () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">ガキが舐めてると潰すぞメーカー </h1>
        <Creator />
        <div className="share">
          <a
            href="https://twitter.com/share"
            className="twitter-share-button"
            data-show-count="false"
            data-url="https://kik4.github.io/nametsubu/"
            data-text="#ガキが舐めてると潰すぞメーカー"
          >
            Tweet
          </a>
        </div>
        <span className="version">ver 1.2.0</span>
      </div>
    </section>
  )
}
