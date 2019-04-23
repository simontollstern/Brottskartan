import React, { Component } from 'react'
import { BrowserRouter as Link} from "react-router-dom";
import style from './NavbarComponent.module.css'

class NavbarComponent extends Component {
  render() {
    return (
      <div>
        <ul>
          <Link to="/brott">Brott</Link>
          <Link to="/polisstationer">Polisstationer</Link>
          <Link to="/statistik">Statistik</Link>
        </ul>
      </div>
    )
  }
}

export default NavbarComponent;
