import React, { useState } from 'react';
import SliderComponent from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = () => {
  const [hv, setHV] = useState(`${window.innerHeight - 300}px`);
  const [wv, setWV] = useState(`${window.innerWidth - 25}px`);

  window.addEventListener('resize' ,(event) => {
    setHV(`${window.innerHeight - 300}px`);
    setWV(`${window.innerWidth - 25}px`);
  });

  const images = [
    '/images/s3.jpg',
    '/images/s2.jpg',
    '/images/s1.jpg',
    '/images/s4.jpg',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    swipeToSlide: true,
    edgeFriction: 0.15,
  };

  return (
    <>
      <SliderComponent {...settings} style={{ width: `${wv}`, paddingLeft: '25px' }}>
        {images.map((item, key) => (
          <img key={key}
               width='1280px'
               height={hv}
                 id={item}
                 src={item}
                 alt='image' />
        ))}
      </SliderComponent>
    </>
  );
}

export default Slider;
