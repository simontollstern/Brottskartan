import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import style from './NavbarComponent.module.css'

class NavbarComponent extends Component {
  render() {
    return (
      <div>
        <ul className={style.navUl}>
          <NavLink to="/brott" activeClassName={style.activeLink}>
          <li className={style.navLi}>Brott</li>
          </NavLink>

          <NavLink to="/polisstationer" activeClassName={style.activeLink}>
          <li className={style.navLi}>Polisstationer</li>
          </NavLink>

          <NavLink to="/statistik" activeClassName={style.activeLink}>
          <li className={style.navLi}>Statistik</li>
          </NavLink>
        </ul>
      </div>
    )
  }
}

export default NavbarComponent;
