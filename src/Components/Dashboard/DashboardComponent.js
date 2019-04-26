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
              <p>sdaa soidjioas iodasiod asoidj asjdo asodaso doasdo iasodi asjdao  asoinsda ads oinads oin</p>
            </div>
          }

        </div>
        <NavbarComponent
        updateType={this.updateType}
        />
        <SearchFuncComponent/>
        {this.state.showType === 'crime' &&
          <DropdownComponent/>
        }
      </div>
    )
  }
}

export default DashboardComponent;
