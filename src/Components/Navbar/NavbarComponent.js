import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import style from './NavbarComponent.module.css'

class NavbarComponent extends Component {
  
  infoTextObject = {
    crime: 'Här visar vi de 500 senaste brotten',
    stations: 'Här visas alla tillgängliga polisstationer',
    stats: 'Här visar vi statistik över brott i Sverige'
  }

  constructor(props) {
    super(props)
    this.state = {
      infoText: this.infoTextObject.crime
      //bug when refreshing ask robin
    }
  }


  stateFunc = (param) => {
    this.setState({
      infoText: this.infoTextObject[param]
    })
    this.props.updateType(param);
  }

  render() {
    return (
      <div className={style.wrapper}>
        <ul className={style.navUl}>
          <NavLink to="/brott" activeClassName={style.activeLink}
          onClick={()=> {this.stateFunc('crime')}}
          >
            <li className={style.navLi}>Brott</li>
          </NavLink>

          <NavLink to="/polisstationer" activeClassName={style.activeLink}
          onClick={()=> {this.stateFunc('stations')}}
          >
            <li className={style.navLi}>Polisstationer</li>
          </NavLink>

          <NavLink to="/statistik" activeClassName={style.activeLink}
          onClick={()=> {this.stateFunc('stats')}}
          >
            <li className={style.navLi}>Statistik</li>
          </NavLink>
        </ul>
        <p>{this.state.infoText}</p>
      </div>
    )
  }
}

export default NavbarComponent;
