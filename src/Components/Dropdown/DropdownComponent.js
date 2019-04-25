import React, { Component } from 'react'
import style from './DropdownComponent.module.css';

export default class DropdownComponent extends Component {
  render() {
    return (
      <div className={style.dropdownWrapper}>
        <select className={style.dropdown}>
          <option value="volvo">Välj typ av brott</option>
        </select>
      </div>
    )
  }
}
