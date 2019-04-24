import React, { Component } from 'react'
import style from './DropdownComponent.module.css';

export default class DropdownComponent extends Component {
  render() {
    return (
      <div className={style.dropdownWrapper}>
        <div className={style.dropdown}>Dropdown <div className={style.triangleDown}></div></div>
      </div>
    )
  }
}
