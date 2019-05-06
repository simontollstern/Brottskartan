import React from 'react'
import style from './footer.module.css';
import './slider.css';
import { connect } from 'react-redux';
import { useEffect } from 'react';

// Show the latest crimes in the bottom of the page
function FooterComponent(props) {

  useEffect(() => {
    // Get the element with id 'slider'
    const slider = document.querySelector('#slider');

    let animation;
    let margin = 0;

    // Function that moves the slider
    const slide = () => {
      // The amount of pixels to move the slider every frame
      margin -= 0.7;
      // Reduce the marginLeft style of the first child in the slider
      slider.children[0].style.marginLeft = margin + 'px';

      // If the first child is outside of the slider
      if(margin <= -slider.children[0].offsetWidth){
        // Reset its marginLeft
        margin = 0;
        slider.children[0].style.marginLeft = '0px';
        // Make it the last child in the slider
        slider.appendChild(slider.children[0]);
      }

      // Request the next animation frame
      animation = requestAnimationFrame(slide);
    }

    // If the slider element has children
    if(slider.children.length > 0){
      // Start the animation
      animation = requestAnimationFrame(slide);

      // Pause the animation on mouseenter
      slider.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animation);
      });

      // Resume it on mouseleave
      slider.addEventListener('mouseleave', () => {
        animation = requestAnimationFrame(slide);
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
