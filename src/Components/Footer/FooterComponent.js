import React from 'react'

import style from './footer.module.css';
// Show the latest crimes in the bottom of the page

export default function FooterComponent() {
  return (
    <div className={style.boxStyle}>
      <h5 className={style.latest}>Senaste Nytt: </h5>
      <div className={style.news}>
        <h5>17 april 09:41, Trafikolycka</h5>
        <h5>17 april 09:41, Trafikolycka</h5>
        <h5>17 april 09:41, Trafikolycka</h5>
        <h5>17 april 09:41, Trafikolycka</h5>
        <h5>17 april 09:41, Trafikolycka</h5>
      </div>
    </div>
  )
}
