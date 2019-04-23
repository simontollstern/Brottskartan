import React, { Component } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import SearchFuncComponent from '../Search/SearchFuncComponent'
import style from './CardComponent.module.css'

class CardComponent extends Component {
  render() {
    return (
      <div className={style.card}>
        <div className={style.border}>
          <h1 className={style.header}>
            Brottskartan
          </h1>
        </div>
        <NavbarComponent/>
        <SearchFuncComponent/>
      </div>
    )
  }
}

export default CardComponent;
