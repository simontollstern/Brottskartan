import React from 'react'

import style from './footer.module.css';
import { connect } from 'react-redux';
import { useEffect } from 'react';

// Show the latest crimes in the bottom of the page

function FooterComponent(props) {

  useEffect(() => {
    const slider = document.querySelector('.footer_slider__17LvF');

    let margin = 0;
    const interval = () => {
      margin--;
      slider.children[0].style.marginLeft = margin + 'px';

      if(margin === -slider.children[0].offsetWidth){
        margin = 0;
        slider.children[0].style.marginLeft = '0px';
        slider.appendChild(slider.children[0]);
      }
    }

    if(slider.children.length > 0){
      let slide = setInterval(interval, 10);

      slider.addEventListener('mouseenter', () => {
        clearInterval(slide);
      });

      slider.addEventListener('mouseleave', () => {
        slide = setInterval(interval, 10);
      });
    }
  });

  return (
    <div className={style.boxStyle}>
      <h4 className={style.latest}>Senaste Nytt:</h4>
      <div className={style.news}>
        <div className={style.slider}>
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
