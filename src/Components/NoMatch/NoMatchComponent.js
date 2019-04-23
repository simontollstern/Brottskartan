import React from 'react'

import style from './NoMatch.module.css';

function NoMatchComponent() {
  return (
    <div className={style.background}>
      <h1>The page you're looking for doesn't exist, please try again</h1>
      <img src="https://ui-ex.com/images/chasing-clipart-robbery-2.jpg" alt="Police chasing a thief" />
    </div>
  )
}

export default NoMatchComponent;