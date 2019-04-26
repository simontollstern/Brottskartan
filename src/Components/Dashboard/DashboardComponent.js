import React, { Component } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import SearchFuncComponent from '../Search/SearchFuncComponent'
import style from './DashboardComponent.module.css'
import DropdownComponent from '../Dropdown/DropdownComponent';

class DashboardComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showType: 'crime',
      toggleInfo: false
    }
  }

  toggleInfo = () => {
    this.setState({ toggleInfo: !this.state.toggleInfo })
  }

  updateType = (type) => {
    this.setState({
      showType: type
    })
  }

  render() {
    return (
      <div className={style.card}>
        <div className={style.border}>
          <h1 className={style.header}>
            Brottskarta
          </h1>
          <button className={style.link} onClick={this.toggleInfo}>Om oss</button>

          {
          this.state.toggleInfo &&
            <div className={style.aboutUs}>
              <p>Dolor sint ullamco anim minim incididunt ut velit excepteur non consectetur labore duis ea proident. Cupidatat aliquip ullamco aute aute et dolor eiusmod anim. Eiusmod anim elit sunt culpa. Dolore amet consequat exercitation anim excepteur tempor. Nostrud exercitation quis sit eu amet.</p>
            </div>
          }

        </div>
        <NavbarComponent
        updateType={this.updateType}
        />
        <SearchFuncComponent />
        
        {this.state.showType === 'crime' &&
          <DropdownComponent/>
        }
      </div>
    )
  }
}

export default DashboardComponent;
