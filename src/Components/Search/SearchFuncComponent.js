import React from 'react'
import style from './SearchFuncComponent.module.css'


function SearchFuncComponent(props) {

    return (
      <div>
        <input id='input' className={style.search} placeholder='Sök' type="text"/>
      </div>
    )

}

export default SearchFuncComponent
