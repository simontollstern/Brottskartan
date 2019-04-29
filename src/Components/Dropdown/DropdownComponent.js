import React, { Component } from 'react'
import style from './DropdownComponent.module.css';
import { setType } from '../../Redux/actions';
import { connect } from 'react-redux';

class DropdownComponent extends Component {

  changeSelectedType = () => {
    this.props.setType(document.querySelector('select').value);
  }

  render() {

    let crimeTypes = [];
    for(let crime of this.props.crimes){
      if(!crimeTypes.some(e => e.name === crime.type)) {
        crimeTypes.push({
          name: crime.type,
          count: 1
        })
      } else {
        for(let type of crimeTypes) {
          if(type.name === crime.type) {
            type.count++;
          }
        }
      }
    }
    crimeTypes.sort();

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
