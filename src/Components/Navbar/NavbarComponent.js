import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import style from './NavbarComponent.module.css'
import { withRouter } from 'react-router'

// renders our navigation
class NavbarComponent extends Component {

  // object with info to show according to route
  infoTextObject = {

    crime: 'Här visas senaste dygnets brott',
    stations: 'Här visas alla tillgängliga polisstationer',
    stats: 'Här visar vi statistik över brott i Sverige'
  }

  // sets state for our infoText
  constructor(props) {
    super(props)

    this.state = {
      infoText: ''
    }
  }

  // when our component mounts we manipulate state depending on url
  componentDidMount() {
    switch (this.props.location.pathname) {
      case '/brott':
        this.stateFunc('crime');
        break;
        case '/polisstationer':
        this.stateFunc('stations');
        break;
        case '/statistik':
        this.stateFunc('stats');
        break;
        default:
        break;
    }
  }

  // sets state and sends our param to dashboard
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
          <NavLink 
            to="/brott" 
            activeClassName={style.activeLink}
            onClick={()=> {this.stateFunc('crime')}}
            >
            <li className={style.navLi}>Brott</li>
          </NavLink>

          <NavLink 
            to="/polisstationer" 
            activeClassName={style.activeLink}
            onClick={()=> {this.stateFunc('stations')}}
          >
            <li className={style.navLi}>Polisstationer</li>
          </NavLink>

          <NavLink 
            to="/statistik" 
            activeClassName={style.activeLink}
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

export default  withRouter(NavbarComponent);
