import React from 'react'

import style from './footer.module.css';
import './slider.css';
import { connect } from 'react-redux';
import { useEffect } from 'react';

// Show the latest crimes in the bottom of the page

function FooterComponent(props) {

  useEffect(() => {
    const slider = document.querySelector('#slider');

    let animation;
    let margin = 0;
    const interval = () => {
      margin -= 0.7;
      slider.children[0].style.marginLeft = margin + 'px';

      if(margin <= -slider.children[0].offsetWidth){
        margin = 0;
        slider.children[0].style.marginLeft = '0px';
        slider.appendChild(slider.children[0]);
      }

      animation = requestAnimationFrame(interval);
    }

    if(slider.children.length > 0){
      animation = requestAnimationFrame(interval);

      slider.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animation);
      });

      slider.addEventListener('mouseleave', () => {
        animation = requestAnimationFrame(interval);
      });
    }
  });


  return (
    <div className={style.boxStyle}>
      <h4 className={style.latest}>
        Senaste Nytt:
      </h4>
      <div className={style.news}>
        <div id="slider">
          {props.crimes.map((crime, i) => {
            return i < 10 && <div key={i}><h5>{crime.name}</h5></div>
          })}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  crimes: state.root.crimes
});

export default connect(mapStateToProps, null)(FooterComponent);
