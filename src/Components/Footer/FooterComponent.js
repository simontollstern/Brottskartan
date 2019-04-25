import React from 'react'

import style from './footer.module.css';
import Slider from "react-slick";
import { connect } from 'react-redux';

// Show the latest crimes in the bottom of the page

function FooterComponent(props) {
  const settings = {
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    cssEase: "linear",
    arrows: false,
    draggable: false,
    centerMode: true,
    variableWidth: true
  };


  return (
    <div className={style.boxStyle}>
      <h4 className={style.latest}>Senaste Nytt:</h4>
      <div className={style.news}>
        <Slider {...settings}>
          {props.crimes.map((crime, i) => {
            return i < 5 && <div key={i}><h5>{crime.name}</h5></div>
          })}
        </Slider>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  crimes: state.root.crimes
});

export default connect(mapStateToProps, null)(FooterComponent);