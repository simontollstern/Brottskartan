import React from 'react'

import style from './footer.module.css';
import withHttpRequests from '../Hocs/withHttpRequests';
import Slider from "react-slick";

// Show the latest crimes in the bottom of the page

function FooterComponent() {

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
      <h5 className={style.latest}>Senaste Nytt: </h5>
      <div className={style.news}>
        <Slider {...settings}>
          <div><h5>24 april 06:55, Trafikolycka, singel, Katrineholm</h5></div>
          <div><h5>24 april 06:55, Trafikolycka, singel, Katrineholm</h5></div>
          <div><h5>24 april 06:55, Trafikolycka, singel, Katrineholm</h5></div>
          <div><h5>24 april 06:55, Trafikolycka, singel, Katrineholm</h5></div>
          <div><h5>24 april 06:55, Trafikolycka, singel, Katrineholm</h5></div>
          <div><h5>24 april 06:55, Trafikolycka, singel, Katrineholm</h5></div>
          <div><h5>24 april 06:55, Trafikolycka, singel, Katrineholm</h5></div>
        </Slider>
      </div>
    </div>
  )
}

export default withHttpRequests(FooterComponent);