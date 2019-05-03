import React, { Component } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import SearchFuncComponent from '../Search/SearchFuncComponent'
import style from './DashboardComponent.module.css'
import DropdownComponent from '../Dropdown/DropdownComponent';

class DashboardComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showType: '',
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
          <button 
            className={style.link} 
            onClick={this.toggleInfo}>
            Om oss
          </button>

          {this.state.toggleInfo &&
            <div className={style.aboutUs}>
              <h3>Välkommen till Brottskarta.se</h3>
              <p>
                Här visas brott hämtade från Polisen, med hjälp av Polisens öppna api.
              </p>
              <br/>
              <p>
                Efter lite research så tyckte vi att detta var en utmärkt ide för att få fler personer mer aktiva i att ha en överblick över vad som sker i sverige på ett neutralt och lätt sätt.
              </p>
              <br/>
              <p>
                Alla länkar på denna sidan leder till Polisen.se
              </p>
              <p>
                All information angående länkningspolicy finns &nbsp;
                <a target="_blank" href="https://polisen.se/om-polisen/om-webbplatsen/lankningspolicy/">
                här 
                </a>
                </p>
              <p>
                &copy;
              </p>
            </div>
          }

        </div>
        <NavbarComponent updateType={this.updateType}/>
        <SearchFuncComponent/>

        {this.state.showType === 'crime' &&
          <DropdownComponent/>
        }
      </div>
    )
  }
}

export default DashboardComponent;
