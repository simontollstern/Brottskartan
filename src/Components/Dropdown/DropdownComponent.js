import React, { Component } from 'react'
import style from './DropdownComponent.module.css';
import { setType } from '../../Redux/actions';
import { connect } from 'react-redux';

class DropdownComponent extends Component {

  // Sends the selected value to the Redux store
  changeSelectedType = () => {
    this.props.setType(document.querySelector('select').value);
  }

  componentDidMount(){
    this.props.setType('Alla');
  }

  render() {
    // Define an empty array
    let crimeTypes = [];

    // Loop through the data from the API
      for(let crime of this.props.crimes){
        // If the array created above doesn't contain the type of the current crime
        if(!crimeTypes.some(e => e.name === crime.type)) {
          // Push the crime to the array
          crimeTypes.push({
            name: crime.type,
            count: 1
          })
        } else {
          // If it already exists - add 1 to its crime count
          for(let type of crimeTypes) {
            if(type.name === crime.type) {
              type.count++;
            }
          }
        }
      }

      // Sort the array alphabetically
      crimeTypes.sort((a, b) => (a.name > b.name) ? 1 : -1)

    return (
      <div className={style.dropdownWrapper}>
        <select className={style.dropdown} onChange={this.changeSelectedType}>
          <option value="Alla">Alla brottstyper</option>
          {crimeTypes.map((type, i) => {
            return <option key={i} value={type.name}>{type.name} ({type.count})</option>
          })}
        </select>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  crimes: state.root.crimes
});

const mapDispatchToProps = (dispatch) => ({
  setType: (type) => dispatch(setType(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownComponent);
